'use strict';
//timeline操作
const userFollowProxy = require('./user_follow');
const animeProxy = require('./anime');
const userProxy = require('./user');
const tool = require('../common/tool');

/**
 * 获取时间轴动画订阅列表
 * @param  {Object} query    Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getAnimeSubListByTimeline(query,page,pageSize){
    return animeProxy.getAnimeSubListOnly(query,'anime_id sub_user update_at',page,pageSize)
    .then(function(result){
        if(result[1].length===0) return tool.nextPromise(null,[0,[]]);
        //重组动画详情查询
        let animeIds=new Set();
        let userIds=new Set();
        result[1].forEach(function(sub){
            animeIds.add(sub.anime_id);
            userIds.add(sub.sub_user);
        });
        return Promise.all([animeProxy.getList({
            '_id':{
                $in:Array.from(animeIds)
            }
        },'_id name cover cover_clip show_status desc public_status'),userProxy.getList({
            '_id':{
                $in:Array.from(userIds)
            }
        },'_id nickname avatar avatar_clip')])
        .then(function(addResult){
            let animeList={};
            let userList={};
            addResult[0].forEach(function(anime){
                animeList[anime._id]=Object.assign({},anime._doc);
                delete animeList[anime._id]._id;
            });
            addResult[1].forEach(function(user){
                userList[user._id]=Object.assign({},user._doc);
                delete userList[user._id]._id;
            });
            let animeSubList=result[1].map(function(sub){
                return Object.assign({},sub._doc,animeList[sub.anime_id],userList[sub.sub_user]);
            });
            return tool.nextPromise(null,[result[0],animeSubList]);
        });
    });
}

/**
 * 获取订阅动态列表
 * @param  {Object} query    Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getSubList(query,page,pageSize){
    return getAnimeSubListByTimeline(query,page,pageSize);
}

/**
 * 获取用户订阅动态列表
 * @param  {Object} query    Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getSubListByUserFollow(query,page,pageSize){
    return userFollowProxy.getList(query,'follow_user') //获取关注列表
    .then(function(userFollowList){
        let ids=userFollowList.map(function(userFollow){
            return userFollow.follow_user;
        });
        if(ids.length===0) return tool.nextPromise(null,[0,[]]);
        return getAnimeSubListByTimeline({
            'sub_user':{
                $in:ids
            },
            'sub_status':1
        },page,pageSize);
    });
}

exports.getSubList = getSubList;
exports.getSubListByUserFollow = getSubListByUserFollow;