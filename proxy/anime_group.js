'use strict';
//动画集合操作
const AnimeGroup = require('../models').AnimeGroup;
const AnimeGroupTask = require('../models').AnimeGroupTask;
const AnimeGroupItem = require('../models').AnimeGroupItem;
const ANIME_GROUP = require('../enums/anime_group');
const animeProxy = require('./anime');
const validator = require('validator');
const tool = require('../common/tool');

/**
 * 新增动画合集
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    if(!data.animeId||!validator.isMongoId(data.animeId)){
        let err=new Error('错误的动画ID');
        return tool.nextPromise(err);
    }
    if(!data.type||!ANIME_GROUP.type[data.type]){
        let err=new Error('错误的合集类型');
        return tool.nextPromise(err);
    }
    return animeProxy.getById(data.animeId).then(function(anime){
        if(anime){
            let animeGroup=new AnimeGroup();
            animeGroup.anime_id=data.animeId;
            animeGroup.type=data.type;
            animeGroup.episode_total=data.episodeTotal;
            animeGroup.episode_cur=0;
            animeGroup.create_user=data.createUser;
            animeGroup.status=1;
            return animeGroup.save();
        }else throw new Error('没有该数据');
    })
}

/**
 * 根据ID获取动画合集
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return AnimeGroup.findOne({_id: id});
}

/**
 * 获取动画合集
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    return Promise.all([AnimeGroup.count(query).exec(),AnimeGroup.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}

exports.newAndSave = newAndSave;
exports.getList = getList;