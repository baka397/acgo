'use strict';
//标签操作
const Anime = require('../models').Anime;
const AnimeEdit = require('../models').AnimeEdit;
const AnimeSub = require('../models').AnimeSub;
const searcher = require('../lib/search/');
const ANIME = require('../enums/anime');
const tagProxy = require('./tag');
const validator = require('validator');
const tool = require('../common/tool');
let animeSearch = searcher.createSearch('animes');

function validAnimePromise(data){
    //裁剪检测
    let validClip=true;
    data.coverClip=data.coverClip?data.coverClip.split(','):[];
    if(data.coverClip.length!==4){
        let err=new Error('无效的裁剪参数');
        return tool.nextPromise(err);
    }
    data.coverClip=data.coverClip.map(function(clip){
        let clipVal=parseInt(clip);
        if(!clipVal) validClip=false;
        return clipVal;
    });
    if(!validClip){
        let err=new Error('无效的裁剪参数');
        return tool.nextPromise(err);
    }
    //标签数据
    data.tag=data.tag?data.tag.split(','):[];
    data.staff=data.staff?data.staff.split(','):[];
    data.cv=data.cv?data.cv.split(','):[];
    if(!ANIME.showStatus[data.showStatus]){
        let err=new Error('无效的放映状态');
        return tool.nextPromise(err);
    }
    if(!Array.isArray(data.tag)||!Array.isArray(data.staff)||!Array.isArray(data.cv)){
        let err=new Error('标签数据错误');
        return tool.nextPromise(err);
    }
    if(data.tag.length===0||data.tag.length>5){
        let err=new Error('请添加1-5个标签');
        return tool.nextPromise(err);
    }
    if(data.staff.length===0||data.staff.length>5){
        let err=new Error('请添加1-5个工作人员');
        return tool.nextPromise(err);
    }
    if(data.cv.length===0||data.cv.length>5){
        let err=new Error('请添加1-5个声优');
        return tool.nextPromise(err);
    }
    //检测标签是否合规
    let tagList=[].concat(data.tag,data.staff,data.cv);
    let idValidResult=tagList.every(function(tag){
        return validator.isMongoId(tag)
    });
    if(!idValidResult){
        let err=new Error('无效的标签ID');
        return tool.nextPromise(err);
    }
    //检测标签是否存在
    let promiseList = [];
    promiseList.push(tagProxy.getList({
        '_id':{
            $in:data.tag
        },
        type:1
    }));
    promiseList.push(tagProxy.getList({
        '_id':{
            $in:data.staff
        },
        type:2
    }));
    promiseList.push(tagProxy.getList({
        '_id':{
            $in:data.cv
        },
        type:3
    }));
    return Promise.all(promiseList).then(function(result){
        if(result[0][1].length!==data.tag.length||result[1][1].length!==data.staff.length||result[2][1].length!==data.cv.length) throw new Error('存在无效的标签值');
        else return tool.nextPromise();
    })
}

/**
 * 新增动画
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    return validAnimePromise(data).then(function(){
        //存储动画信息
        let anime = new Anime();
        anime.name = data.name;
        anime.alias = data.alias;
        anime.cover = data.cover;
        anime.cover_clip = data.coverClip;
        anime.show_status = data.showStatus;
        anime.desc = data.desc;
        anime.tag = data.tag;
        anime.staff = data.staff;
        anime.cv = data.cv;
        anime.public_status = 0;
        return anime.save();
    }).then(function(result){
        return newAndSaveAnimeEdit(Object.assign(data,{
            animeId:result._id
        }),true)
    }).then(function(result){
        return new Promise(function(resolve,reject){
            animeSearch.index(data.name,data.animeId,function(){
                resolve();
            });
        })
    })
}

/**
 * 新增动画编辑数据
 * @param  {String} data  数据对象
 * @param  {Boolen} valid 是否关闭验证
 * @return {Object}       Promise对象
 */
function newAndSaveAnimeEdit(data,unvalid){
    let validPromise;
    if(!unvalid){
        validPromise = validAnimePromise(data);
    }else{
        validPromise = tool.nextPromise();
    }
    return validPromise.then(function(){
        return getById(data.animeId);
    }).then(function(anime){
        if(anime){
            let animeEdit = new AnimeEdit();
            animeEdit.alias = data.alias;
            animeEdit.cover = data.cover;
            animeEdit.cover_clip = data.coverClip;
            animeEdit.show_status = data.showStatus;
            animeEdit.desc = data.desc;
            animeEdit.tag = data.tag;
            animeEdit.staff = data.staff;
            animeEdit.cv = data.cv;
            animeEdit.audit_status = 0;
            animeEdit.anime_id = data.animeId;
            animeEdit.edit_user = data.editUser;
            return animeEdit.save();
        }
        else throw new Error('没有该数据');
    })
}

/**
 * 根据ID获取动画
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return Anime.findOne({_id: id});
}

/**
 * 根据ID获取动画编辑数据
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getAnimeEditById(id){
    return AnimeEdit.findOne({_id: id});
}

/**
 * 根据关键字查询动画
 * @param  {String} keyword  关键字
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function search(keyword,fields,page,pageSize){
    return new Promise(function(resolve,reject){
        if(!keyword) throw new Error('请输入关键字');
        animeSearch.query(keyword).end(function(err,ids){
            if(err) reject(err);
            else resolve(ids);
        })
    }).then(function(ids){
        if(ids.length===0) return new Promise(function(resolve,reject){
            resolve([0,[]]);
        });
        return getList({
            '_id':{
                $in:ids
            }
        },fields,page,pageSize)
    })
}

/**
 * 获取动画列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    return Promise.all([Anime.count(query).exec(),Anime.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}

/**
 * 获取动画编辑列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getAnimeEditList(query,fields,page,pageSize){
    return Promise.all([AnimeEdit.count(query).exec(),AnimeEdit.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}
exports.newAndSave = newAndSave;
exports.newAndSaveAnimeEdit = newAndSaveAnimeEdit;
exports.getById = getById;
exports.getAnimeEditById = getAnimeEditById;
exports.search = search;
exports.getList = getList;
exports.getAnimeEditList = getAnimeEditList;