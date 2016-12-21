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
 * 新增动画合集任务
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSaveTask(data){
    if(!data.groupId||!validator.isMongoId(data.groupId)){
        let err=new Error('错误的动画集合ID');
        return tool.nextPromise(err);
    }
    if(!data.taskPeriod||!ANIME_GROUP.taskPeriod[data.taskPeriod]){
        let err=new Error('错误的更新周期');
        return tool.nextPromise(err);
    }
    return getById(data.groupId).then(function(animeGroup){
        if(animeGroup){
            //检测URL规则
            if(ANIME_GROUP.type[animeGroup.type]&&ANIME_GROUP.type[animeGroup.type].taskRegExp){
                let reg = ANIME_GROUP.type[animeGroup.type].taskRegExp;
                if(!reg.test(data.url)) throw new Error('无效的URL');
            }
            let animeGroupTask=new AnimeGroupTask();
            animeGroupTask.group_id = data.groupId;
            animeGroupTask.url = data.url;
            animeGroupTask.task_period = data.taskPeriod;
            animeGroupTask.task_status = data.taskStatus;
            return animeGroupTask.save();
        }else throw new Error('没有该数据');
    })
}

/**
 * 根据用户ID更新动画集合
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateById(id,data){
    if(!id||!validator.isMongoId(id)){
        let err = new Error('请指定正确的ID');
        return tool.nextPromise(err);
    }
    if(!isNaN(data.status)&&!ANIME_GROUP.status[data.status]){
        let err=new Error('错误的动画集合状态');
        return tool.nextPromise(err);
    }
    return getById(id).then(function(animeGroup){
        if(animeGroup){
            let saveData={};
            if(data.episodeTotal) saveData.episode_total = data.episodeTotal;
            if(data.episodeCur) saveData.episode_cur = data.episodeCur;
            if(!isNaN(data.status)) saveData.status = data.status;
            Object.assign(animeGroup,saveData);
            return animeGroup.save();
        }
        else throw new Error('没有该数据');
    })
}

/**
 * 根据用户ID更新动画集合任务
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateTaskById(id,data){
    if(!id||!validator.isMongoId(id)){
        let err = new Error('请指定正确的ID');
        return tool.nextPromise(err);
    }
    if(isNaN(data.taskStatus)||!ANIME_GROUP.taskStatus[data.taskStatus]){
        let err=new Error('错误的动画集合任务状态');
        return tool.nextPromise(err);
    }
    return getTaskById(id).then(function(animeGroupTask){
        if(animeGroupTask){
            let saveData={};
            if(!isNaN(data.taskStatus)) saveData.task_status = data.taskStatus;
            Object.assign(animeGroupTask,saveData);
            return animeGroupTask.save();
        }
        else throw new Error('没有该数据');
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
 * 根据ID获取动画合集
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getTaskById(id){
    return AnimeGroupTask.findOne({_id: id});
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

/**
 * 获取动画合集任务
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getListTask(query,fields,page,pageSize){
    return Promise.all([AnimeGroupTask.count(query).exec(),AnimeGroupTask.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}

exports.newAndSave = newAndSave;
exports.newAndSaveTask = newAndSaveTask;
exports.getById = getById;
exports.getTaskById = getTaskById;
exports.updateById = updateById;
exports.updateTaskById = updateTaskById;
exports.getList = getList;
exports.getListTask = getListTask;