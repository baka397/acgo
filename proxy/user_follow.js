'use strict';
//用户关注操作
const validator = require('validator');
const userProxy = require('./user');
const UserFollow = require('../models').UserFollow;
const tool = require('../common/tool');
/**
 * 获取用户关注数据
 * @param  {Object} data 验证数据,该对象部分数据会被重写
 * @return {Object}      Promise对象
 */
function getFollowshipPromise(data){
    if(!data.followUser||!validator.isMongoId(data.followUser)){
        let err=new Error('无效的关注用户');
        return tool.nextPromise(err);
    }
    if(data.createUser.toString()===data.followUser.toString()){
        let err=new Error('你不能关注自己');
        return tool.nextPromise(err);
    }
    return userProxy.getById(data.followUser).then(function(user){
        if(!user){
            let err=new Error('无效的用户');
            return tool.nextPromise(err);
        }
        else return tool.nextPromise();
    }).then(function(){
        //查询关注关系
        return getRelation(data);
    });
}
/**
 * 新增用户关注
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    return getFollowshipPromise(data).then(function(followships){
        let following; //已关注
        let followed; //已被关注
        let promiseList=[];
        if(followships){
            //匹配数据
            followships.forEach(function(followship){
                if(followship.create_user.toString()===data.createUser.toString()){ //如果是关注
                    following=followship;
                }else{
                    followed=followship;
                }
            });
        }
        if(!following){//如果没有关注关系,则创建关注关系
            following=new UserFollow();
            following.create_user=data.createUser;
            following.follow_user=data.followUser;
        }else if(following.status!==0){ //检测是否已关注
            let err=new Error('已经关注,请勿重复关注');
            return tool.nextPromise(err);
        }
        if(followed&&followed.status===1){ //如果已被关注,则创建相互关注关系
            following.status=2;
            followed.status=2;
            promiseList.push(following.save());
            promiseList.push(followed.save());
        }else{ //否则,只创建关注关系
            following.status=1;
            promiseList.push(following.save());
        }
        return Promise.all(promiseList);
    });
}

/**
 * 取消关注关系
 * @param  {String} id     关注ID
 * @param  {String} userId 取消关注的用户ID
 * @return {Object}        Promise对象
 */
function cancelAndSave(id,userId){
    if(!validator.isMongoId(id)){
        let err=new Error('错误的关注关系');
        return tool.nextPromise(err);
    }
    return getById(id).then(function(userFollow){
        if(userFollow){
            if(!userId||userId!==userFollow.create_user.toString()){
                throw new Error('你无权进行此操作');
            }
            switch(userFollow.status){
            case 0:
                throw new Error('已经取消关注,请勿重复提交.');
            case 1: //单方关注
                userFollow.status=0;
                return userFollow.save();
            default: //互相关注
                return getRelation({
                    createUser:userFollow.create_user,
                    followUser:userFollow.follow_user
                }).then(function(followships){
                    let following; //已关注
                    let followed; //已被关注
                    let promiseList=[];
                    //匹配数据
                    followships.forEach(function(followship){
                        if(followship.create_user.toString()===userFollow.create_user.toString()){ //如果是关注
                            following=followship;
                        }else{
                            followed=followship;
                        }
                    });
                    if(following){ //取消关注
                        following.status=0;
                        promiseList.push(following.save());
                    }
                    if(followed&&followed.status===2){ //取消双向关注状态
                        followed.status=1;
                        promiseList.push(followed.save());
                    }
                    return Promise.all(promiseList);
                });
            }
        }else throw new Error('无效的数据');
    });
}

/**
 * 根据ID获取用户关注关系
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return UserFollow.findOne({_id: id});
}

/**
 * 获取关注
 * @param  {Object} data 用户数据
 * @return {Object}      Promise对象
 */
function getRelation(data){
    return getList({
        $or:[{
            create_user:data.createUser,
            follow_user:data.followUser
        },{
            create_user:data.followUser,
            follow_user:data.createUser
        }]
    },'_id status create_user');
}

/**
 * 获取用户关注列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    if(page&&pageSize) return Promise.all([UserFollow.count(query).exec(),UserFollow.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
    else return UserFollow.find(query).select(fields).exec();
}

/**
 * 获取包含用户信息的用户关注列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getListWithUser(query,fields,page,pageSize){
    return getList(query,fields,page,pageSize).then(function(userFollowList){
        let ids=userFollowList[1].map(function(userFollow){
            if(userFollow.follow_user) return userFollow.follow_user;
            if(userFollow.create_user) return userFollow.create_user;
        });
        if(ids.length===0) return tool.nextPromise(null,[]);
        return Promise.all([tool.nextPromise(null,userFollowList),userProxy.getList({
            '_id':{
                $in:ids
            }
        },'_id nickname avatar avatar_clip desc')]);
    }).then(function(result){
        if(result.length===0) return tool.nextPromise(null,[0,[]]);
        let userFollowList=result[0];
        let userObj={};
        result[1].forEach(function(user){
            userObj[user._id]=Object.assign({},user._doc);
            delete userObj[user._id]._id;
        });
        let userFollowListContent=userFollowList[1].map(function(userFollow){
            let userContent=Object.assign({},userObj[userFollow.follow_user],userObj[userFollow.create_user]);
            return Object.assign(userContent,userFollow._doc);
        });
        return tool.nextPromise(null,[userFollowList[0],userFollowListContent]);
    });
}

exports.newAndSave = newAndSave;
exports.cancelAndSave = cancelAndSave;
exports.getRelation = getRelation;
exports.getList = getList;
exports.getListWithUser = getListWithUser;