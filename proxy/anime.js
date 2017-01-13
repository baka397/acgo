'use strict';
//动画操作
const Anime = require('../models').Anime;
const AnimeEdit = require('../models').AnimeEdit;
const AnimeSub = require('../models').AnimeSub;
const searcher = require('../lib/search/');
const ANIME = require('../enums/anime');
const tagProxy = require('./tag');
const AnimeGroupProxy = require('./anime_group');
const validator = require('validator');
const tool = require('../common/tool');
let animeSearch = searcher.createSearch('animes');

function validAnimePromise(data){
    //裁剪检测
    if(data.cover||data.coverClip){
        let validClip=true;
        data.coverClip=data.coverClip?data.coverClip.split(','):[];
        if(data.coverClip.length!==4){
            let err=new Error('无效的裁剪参数');
            return tool.nextPromise(err);
        }
        data.coverClip=data.coverClip.map(function(clip){
            let clipVal=parseFloat(clip);
            if(isNaN(clipVal)) validClip=false;
            return clipVal;
        });
        if(!validClip){
            let err=new Error('无效的裁剪参数');
            return tool.nextPromise(err);
        }
    }
    if(!isNaN(data.showStatus)&&!ANIME.showStatus[data.showStatus]){
        let err=new Error('无效的放映状态');
        return tool.nextPromise(err);
    }
    //标签数据
    let tagList=[];
    let promiseList = [];
    let needValidKey = [];
    if(data.tag){
        data.tag=data.tag.split(',');
        if(data.tag.length===0||data.tag.length>5){
            let err=new Error('请添加1-5个标签');
            return tool.nextPromise(err);
        }
        tagList=tagList.concat(data.tag);
        needValidKey.push('tag');
        promiseList.push(tagProxy.getList({
            '_id':{
                $in:data.tag
            },
            type:1
        }));
    }
    if(data.staff){
        data.staff=data.staff.split(',');
        if(data.staff.length===0||data.staff.length>5){
            let err=new Error('请添加1-5个工作人员');
            return tool.nextPromise(err);
        }
        tagList=tagList.concat(data.staff);
        needValidKey.push('staff');
        promiseList.push(tagProxy.getList({
            '_id':{
                $in:data.staff
            },
            type:2
        }));
    }
    if(data.cv){
        data.cv=data.cv.split(',');
        if(data.cv.length===0||data.cv.length>5){
            let err=new Error('请添加1-5个声优');
            return tool.nextPromise(err);
        }
        tagList=tagList.concat(data.cv);
        needValidKey.push('cv');
        promiseList.push(tagProxy.getList({
            '_id':{
                $in:data.cv
            },
            type:3
        }));
    }
    //检测标签是否合规
    if(tagList.length>0){
        let idValidResult=tagList.every(function(tag){
            return validator.isMongoId(tag)
        });
        if(!idValidResult){
            let err=new Error('无效的标签ID');
            return tool.nextPromise(err);
        }
    }
    if(promiseList.length>0){
        return Promise.all(promiseList).then(function(result){
            let resultValid=result.every(function(item,index){
                return item[1].length===data[needValidKey[index]].length;
            })
            if(!resultValid) throw new Error('存在无效的标签值');
            else return tool.nextPromise();
        })
    }else{
        return tool.nextPromise();
    }
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
            if(data.alias) animeEdit.alias = data.alias;
            if(data.cover) animeEdit.cover = data.cover;
            if(data.coverClip) animeEdit.cover_clip = data.coverClip;
            if(data.showStatus) animeEdit.show_status = data.showStatus;
            if(data.desc) animeEdit.desc = data.desc;
            if(data.tag) animeEdit.tag = data.tag;
            if(data.staff) animeEdit.staff = data.staff;
            if(data.cv) animeEdit.cv = data.cv;
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

function getAnimeEditByUserId(userId){
    //查找未完成的审核数据
    return AnimeEdit.findOne({
        audit_user: userId,
        audit_status:0
    }).then(function(unexecAnimeEdit){
        //如果存在未完成的审核数据,则使用该数据
        if(unexecAnimeEdit) return tool.nextPromise(null,unexecAnimeEdit);
        //否则新查询一条数据
        else return AnimeEdit.findOne({
            audit_status:0
        }).then(function(animeEdit){
            //如果有数据,则标记所有者
            if(animeEdit){
                animeEdit.audit_user=userId;
                return animeEdit.save();
            }else{
                throw new Error('没有需要审核的动画');
            }
        })
    })
}

function getAnimeSubByAnimeIdAndUserId(animeId,userId){
    return AnimeSub.findOne({
        anime_id:animeId,
        sub_user:userId
    });
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
    if(page&&pageSize) return Promise.all([Anime.count(query).exec(),Anime.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
    else return Anime.find(query).select(fields).exec();
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
    return Promise.all([AnimeEdit.count(query).exec(),AnimeEdit.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).sort({'_id':1}).exec()]);
}

/**
 * 获取动画订阅列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @return {Object}          Promise对象
 */
function getAnimeSubList(query,fields){
    return AnimeSub.find(query).select('anime_id').sort({'_id':1}).exec()
    .then(function(result){
        if(result.length===0) return tool.nextPromise(null,[[],[]]);
        //重组动画详情查询
        let ids=result.map(function(sub){
            return sub.anime_id;
        });
        return Promise.all([getList({
            '_id':{
                $in:ids
            }
        },fields),AnimeGroupProxy.getList({
            'anime_id':{
                $in:ids
            }
        },'_id anime_id episode_cur update_at')])
    })
    .then(function(result){
        let animeList=result[0];
        let animeGroupList=result[1];
        if(animeGroupList.length===0) return tool.nextPromise(null,animeList);
        let animeGroupMap={};
        let animeMap=[];
        let animeField=fields.split(' ');
        animeGroupList.forEach((groupItem)=>{
            if(!animeGroupMap[groupItem.anime_id]){
                animeGroupMap[groupItem.anime_id]={
                    update_at:groupItem.update_at,
                    episode_cur:groupItem.episode_cur,
                    groups:[]
                }
            }
            animeGroupMap[groupItem.anime_id].groups.push(groupItem._id);
        })
        let returnData=animeList.map((anime)=>{
            let animeData={};
            animeField.forEach(function(key){
                animeData[key]=anime[key];
            });
            if(animeGroupMap[animeData._id]){
                Object.assign(animeData,animeGroupMap[animeData._id]);
            }
            return animeData;
        });
        return tool.nextPromise(null,returnData);
    })
}

/**
 * 审核动画信息
 * @param  {String} id    动画编辑信息
 * @param  {Number} data  审核结果
 * @return {Object}       Promise对象
 */
function aduitAnimeEdit(id,data){
    if(!ANIME.auditStatus[data.auditStatus]||data.auditStatus===0){
        let err=new Error('请指定正确的审核结果');
        return tool.nextPromise(err);
    }
    return getAnimeEditById(id).then(function(animeEdit){
        if(animeEdit&&animeEdit.audit_status===0){
            animeEdit.audit_status=data.auditStatus;
            animeEdit.audit_user=data.auditUser;
            //如果是审核通过
            if(data.auditStatus===1){
                return Promise.all([animeEdit.save(),getById(animeEdit.anime_id)]);
            }else{
                return animeEdit.save();
            }
        }
        else throw new Error('没有该数据');
    }).then(function(result){
        if(Array.isArray(result)){
            let animeEdit=result[0];
            let anime=result[1];
            if(animeEdit.alias) anime.alias = animeEdit.alias;
            if(animeEdit.cover) anime.cover = animeEdit.cover;
            if(animeEdit.cover_clip.length>0) anime.cover_clip = animeEdit.cover_clip;
            if(animeEdit.show_status) anime.show_status = animeEdit.show_status;
            if(animeEdit.desc) anime.desc = animeEdit.desc;
            if(animeEdit.tag.length>0) anime.tag = animeEdit.tag;
            if(animeEdit.staff.length>0) anime.staff = animeEdit.staff;
            if(animeEdit.cv.length>0) anime.cv = animeEdit.cv;
            if(anime.public_status===0) anime.public_status=1;
            return anime.save();
        }else{
            return tool.nextPromise();
        }
    })
}

/**
 * 订阅动画
 * @param  {Object} data 订阅数据
 * @return {Object}      Promise对象
 */
function subAnime(data){
    if(!data.animeId||!validator.isMongoId(data.animeId)){
        let err=new Error('错误的动画ID');
        return tool.nextPromise(err);
    }
    return getAnimeSubByAnimeIdAndUserId(data.animeId,data.subUser).then(function(animeSub){
        //如果有该数据
        if(animeSub){
            //如果该数据已订阅
            if(animeSub.sub_status===data.subStatus){
                return tool.nextPromise(null,animeSub);
            }else{
                animeSub.sub_status=data.subStatus;
                return animeSub.save();
            }
        }else{
            //新增时,查询是否存在动画
            return getById(data.animeId).then(function(anime){
                if(anime){
                    animeSub=new AnimeSub();
                    animeSub.anime_id=data.animeId;
                    animeSub.sub_user=data.subUser;
                    animeSub.sub_status=data.subStatus;
                    return animeSub.save();
                }else{
                    throw new Error('没有该数据');
                }
            })
        }
    })
}

exports.newAndSave = newAndSave;
exports.newAndSaveAnimeEdit = newAndSaveAnimeEdit;
exports.getById = getById;
exports.getAnimeEditById = getAnimeEditById;
exports.getAnimeEditByUserId = getAnimeEditByUserId;
exports.search = search;
exports.getList = getList;
exports.getAnimeEditList = getAnimeEditList;
exports.aduitAnimeEdit = aduitAnimeEdit;
exports.subAnime = subAnime;
exports.getAnimeSubList = getAnimeSubList;