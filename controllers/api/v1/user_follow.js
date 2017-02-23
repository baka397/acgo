'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const UserFollow = require('../../../proxy/').UserFollow;
const tool = require('../../../common/tool');
const validator = require('validator');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/user-follow/';

router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.createUser=req.user._id;
    data.followUser=req.body.followUser;
    UserFollow.newAndSave(data)
    .then(function(){
        res.send(tool.buildResJson('关注成功'));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.delete('/:id',function(req,res,next){
    UserFollow.cancelAndSave(req.params.id,req.user._id)
    .then(function(){
        res.send(tool.buildResJson('取消关注成功'));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/follow/:userId',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let userId = req.params.userId;
    if(!validator.isMongoId(userId)){
        let err = new Error('请指定正确的用户');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    UserFollow.getListWithUser({
        create_user:userId,
        status:{
            $gt:0
        }
    },'_id follow_user status',page,pageSize)
    .then(function(result){
        res.send(tool.buildResJson('获取关注列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/fans/:userId',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let userId = req.params.userId;
    if(!validator.isMongoId(userId)){
        let err = new Error('请指定正确的用户');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    UserFollow.getListWithUser({
        follow_user:userId,
        status:{
            $gt:0
        }
    },'_id create_user status',page,pageSize)
    .then(function(result){
        res.send(tool.buildResJson('获取粉丝列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;