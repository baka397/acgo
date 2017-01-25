'use strict';
//动画剧集操作
const AnimeGroup = require('../models').AnimeGroup;
const AnimeGroupTask = require('../models').AnimeGroupTask;
const AnimeGroupItem = require('../models').AnimeGroupItem;
const AnimeGroupHistory = require('../models').AnimeGroupHistory;
const ANIME_GROUP = require('../enums/anime_group');
const animeProxy = require('./anime');
const validator = require('validator');
const tool = require('../common/tool');

/**
 * 新增动画剧集
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    if(!data.animeId||!validator.isMongoId(data.animeId)){
        let err=new Error('错误的动画ID');
        return tool.nextPromise(err);
    }
    if(!data.type||!ANIME_GROUP.type[data.type]){
        let err=new Error('错误的剧集类型');
        return tool.nextPromise(err);
    }
    return getByAnimeIdAndType(data.animeId,data.type).then(function(animeGroup){
        if(animeGroup) throw new Error('已有该剧集,不能添加');
        return animeProxy.getById(data.animeId);
    }).then(function(anime){
        if(anime){
            let animeGroup=new AnimeGroup();
            animeGroup.anime_id=data.animeId;
            animeGroup.type=data.type;
            animeGroup.episode_start=data.episodeStart;
            animeGroup.episode_total=data.episodeTotal;
            animeGroup.episode_cur=0;
            animeGroup.create_user=data.createUser;
            animeGroup.status=1;
            return animeGroup.save();
        }else throw new Error('没有该数据');
    })
}

/**
 * 新增动画剧集任务
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSaveTask(data){
    if(!data.groupId||!validator.isMongoId(data.groupId)){
        let err=new Error('错误的动画剧集ID');
        return tool.nextPromise(err);
    }
    if(!data.taskPeriod||!ANIME_GROUP.taskPeriod[data.taskPeriod]){
        let err=new Error('错误的更新周期');
        return tool.nextPromise(err);
    }
    return getTaskByGroupId(data.groupId).then(function(animeGroupTask){
        if(animeGroupTask) throw new Error('该剧集已有任务,不能添加');
        return getById(data.groupId);
    }).then(function(animeGroup){
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
            animeGroupTask.create_user = data.createUser;
            return animeGroupTask.save();
        }else throw new Error('错误的动画剧集');
    })
}

/**
 * 新增动画剧集分集
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSaveItem(data){
    if(!data.groupId||!validator.isMongoId(data.groupId)){
        let err=new Error('错误的动画剧集ID');
        return tool.nextPromise(err);
    }
    if(!data.episodeNo){
        let err=new Error('错误的分集数');
        return tool.nextPromise(err);
    }
    return getItemByGroupIdAndEpNo(data.groupId,data.episodeNo).then(function(animeGroupItem){
        if(animeGroupItem){
            throw new Error('已存在数据，请勿重复添加');
        }else return getById(data.groupId);
    }).then(function(animeGroup){
        if(animeGroup){
            //检测URL规则
            if(ANIME_GROUP.type[animeGroup.type]&&ANIME_GROUP.type[animeGroup.type].itemRegExp){
                let reg = ANIME_GROUP.type[animeGroup.type].itemRegExp;
                if(!reg.test(data.url)) throw new Error('无效的URL');
            }
            //检测分集规则
            if(animeGroup.episode_total!==0&&animeGroup.episode_total<data.episodeNo){
                throw new Error('无效的分集数量');
            }
            let animeGroupItem=new AnimeGroupItem();
            animeGroupItem.group_id = data.groupId;
            animeGroupItem.url = data.url;
            animeGroupItem.episode_no = data.episodeNo;
            animeGroupItem.episode_name = data.episodeName;
            animeGroupItem.create_user = data.createUser;
            return animeGroupItem.save();
        }else throw new Error('错误的动画剧集');
    }).then(function(result){
        return updateEpCurById(data.groupId);
    })
}

/**
 * 新增动画剧集观看历史数据
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSaveGroupHistory(data){
    return Promise.all([getById(data.groupId),getItemById(data.groupItemId)]).then(function(result){
        let animeGroup=result[0];
        let animeGroupItem=result[1];
        if(animeGroup&&animeGroupItem){
            if(animeGroupItem.group_id.toString()!==animeGroup._id.toString()) throw new Error('数据不匹配');
            let animeGroupHistory=new AnimeGroupHistory();
            animeGroupHistory.group_id=data.groupId;
            animeGroupHistory.sub_user=data.subUser;
            animeGroupHistory.watch_ep=animeGroupItem.episode_no;
            return animeGroupHistory.save();
        }else throw new Error('无效的数据');
    })
}

/**
 * 根据ID更新动画剧集
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
        let err=new Error('错误的动画剧集状态');
        return tool.nextPromise(err);
    }
    return getById(id).then(function(animeGroup){
        if(animeGroup){
            let saveData={};
            if(data.episodeStart) saveData.episode_start=data.episodeStart;
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
 * 根据ID更新动画剧集最大数据
 * @param  {String} id Object ID
 * @return {Object}    Promise对象
 */
function updateEpCurById(id){
    return Promise.all([getById(id),AnimeGroupItem.findOne({
        group_id:id
    }).sort({'episode_no':-1}).select('episode_no')]).then(function(result){
        let animeGroup=result[0];
        let animeGroupItem=result[1];
        if(animeGroup.episode_cur<animeGroupItem.episode_no){
            animeGroup.episode_cur=animeGroupItem.episode_no;
            return animeGroup.save();
        }else return tool.nextPromise();
    })
}

/**
 * 根据ID更新动画剧集任务
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateTaskById(id,data){
    if(!id||!validator.isMongoId(id)){
        let err = new Error('请指定正确的ID');
        return tool.nextPromise(err);
    }
    if(data.taskPeriod&&!ANIME_GROUP.taskPeriod[data.taskPeriod]){
        let err=new Error('错误的更新周期');
        return tool.nextPromise(err);
    }
    if(data.taskStatus&&!ANIME_GROUP.taskStatus[data.taskStatus]){
        let err=new Error('错误的动画剧集任务状态');
        return tool.nextPromise(err);
    }
    return getTaskById(id).then(function(animeGroupTask){
        if(animeGroupTask){
            let saveData={};
            if(data.url) saveData.url = data.url;
            if(!isNaN(data.taskPeriod)) saveData.task_period = data.taskPeriod;
            if(!isNaN(data.taskStatus)) saveData.task_status = data.taskStatus;
            Object.assign(animeGroupTask,saveData);
            return animeGroupTask.save();
        }
        else throw new Error('没有该数据');
    })
}

/**
 * 根据ID更新动画剧集数据
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateItemById(id,data){
    if(!id||!validator.isMongoId(id)){
        let err = new Error('请指定正确的ID');
        return tool.nextPromise(err);
    }
    return getItemById(id).then(function(animeGroupItem){
        if(animeGroupItem){
            //如果修改episodeNo
            if(!isNaN(data.episodeNo)){
                return getItemByGroupIdAndEpNo(animeGroupItem.group_id,data.episodeNo).then(function(animeGroupInfo){
                    if(animeGroupInfo){
                        throw new Error('已存在数据，请勿重复添加');
                    }else return tool.nextPromise(null,animeGroupItem);
                })
            }else return tool.nextPromise(null,animeGroupItem);
        }
        else throw new Error('没有该数据');
    })
    .then(function(animeGroupItem){
        let saveData={};
        let oldUrl=animeGroupItem.url;
        if(data.url){
            let validReuslt=Object.keys(ANIME_GROUP.type).some(function(key){
                let type=ANIME_GROUP.type[key];
                if(!type.itemRegExp.test(oldUrl)) return false;
                else return type.itemRegExp.test(data.url);
            });
            if(!validReuslt) throw new Error('无效的URL');
            else saveData.url = data.url;
        }
        if(data.episodeNo) saveData.episode_no = data.episodeNo;
        if(data.episodeName) saveData.episode_name = data.episodeName;
        saveData.edit_user = data.editUser;
        Object.assign(animeGroupItem,saveData);
        return animeGroupItem.save();
    }).then(function(animeGroupItem){
        return updateEpCurById(animeGroupItem.group_id)
    })
}

/**
 * 更新动画剧集历史数据
 * @param  {String} animeGroupHistory   Object
 * @param  {Object} data                数据对象
 * @return {Object}                     Promise对象
 */
function updateHistoryById(animeGroupHistory,data){
    return getItemById(data.groupItemId).then(function(animeGroupItem){
        if(animeGroupItem){
            // //判断之前的数据是否有效
            // if(animeGroupItem.episode_no<=animeGroupHistory.watch_ep){
            //     return tool.nextPromise();
            // }
            animeGroupHistory.watch_ep=animeGroupItem.episode_no;
            return animeGroupHistory.save();
        }else throw new Error('无效的数据');
    })
}

/**
 * 新增动画剧集观看历史
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function addHistory(data){
    if(!data.groupId||!validator.isMongoId(data.groupId)){
        let err=new Error('错误的动画剧集ID');
        return tool.nextPromise(err);
    }
    if(!data.groupItemId||!validator.isMongoId(data.groupItemId)){
        let err=new Error('错误的动画分集ID');
        return tool.nextPromise(err);
    }
    return getHistoryByGroupIdAndSubUser(data.groupId,data.subUser).then(function(animeGroupHistory){
        //编辑历史数据
        if(animeGroupHistory){
            return updateHistoryById(animeGroupHistory,data);
        }else return newAndSaveGroupHistory(data);
    })
}

/**
 * 根据ID获取动画剧集
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return AnimeGroup.findOne({_id: id});
}

/**
 * 根据动画ID和剧集类型获取动画剧集
 * @param  {String} animeId 动画ID
 * @param  {Number} type    剧集类型
 * @return {Object}         Promise对象
 */
function getByAnimeIdAndType(animeId,type){
    return AnimeGroup.findOne({
        anime_id: animeId,
        type:type
    });
}

/**
 * 根据ID获取动画剧集
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getTaskById(id){
    return AnimeGroupTask.findOne({_id: id});
}

/**
 * 根据剧集ID查询任务
 * @param  {String} groupId 剧集ID
 * @return {Object}         Promise对象
 */
function getTaskByGroupId(groupId){
    return AnimeGroupTask.findOne({group_id: groupId});
}

/**
 * 根据ID获取动画剧集分集
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getItemById(id){
    return AnimeGroupItem.findOne({_id: id});
}

/**
 * 根据Group ID和分集编号获取动画分集
 * @param  {String} group_id 剧集ID
 * @param  {Number} ep_no    分集编号
 * @return {Object}          Promise对象
 */
function getItemByGroupIdAndEpNo(group_id,ep_no){
    return AnimeGroupItem.findOne({
        group_id:group_id,
        episode_no:ep_no
    });
}

/**
 * 根据Group ID和订阅用户获取动画观看历史
 * @param  {String} group_id  剧集ID
 * @param  {Number} sub_user  订阅用户
 * @return {Object}           Promise对象
 */
function getHistoryByGroupIdAndSubUser(group_id,sub_user){
    return AnimeGroupHistory.findOne({
        group_id:group_id,
        sub_user:sub_user
    });
}

/**
 * 获取动画剧集
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    if(page&&pageSize) return Promise.all([AnimeGroup.count(query).exec(),AnimeGroup.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
    else return AnimeGroup.find(query).select(fields).exec();
}

/**
 * 获取动画剧集任务
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getListTask(query,fields,page,pageSize){
    return Promise.all([AnimeGroupTask.count(query).exec(),AnimeGroupTask.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}

/**
 * 获取动画剧集任务
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getListItem(query,fields,page,pageSize){
    return Promise.all([AnimeGroupItem.count(query).exec(),AnimeGroupItem.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}

/**
 * 获取动画剧集历史
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @return {Object}          Promise对象
 */
function getListHistory(query,fields){
    return AnimeGroupHistory.find(query).select(fields).exec();
}

exports.newAndSave = newAndSave;
exports.newAndSaveTask = newAndSaveTask;
exports.newAndSaveItem = newAndSaveItem;
exports.addHistory = addHistory;
exports.getById = getById;
exports.getTaskById = getTaskById;
exports.getTaskByGroupId = getTaskByGroupId;
exports.getItemById = getItemById;
exports.updateById = updateById;
exports.updateTaskById = updateTaskById;
exports.updateItemById = updateItemById;
exports.getList = getList;
exports.getListTask = getListTask;
exports.getListItem = getListItem;
exports.getListHistory = getListHistory;