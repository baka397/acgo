'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const Timeline = require('../../../proxy/').Timeline;
const tool = require('../../../common/tool');
const validator = require('validator');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/timeline/';

router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    Timeline.getSubList({
        'sub_status':1
    },page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取订阅列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/friend',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    Timeline.getSubListByUserFollow({
        create_user:req.user._id
    },page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取订阅列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/:id',function(req,res,next){
    if(!validator.isMongoId(req.params.id)){
        let err = new Error('请指定正确的用户');
        err.status = STATUS_CODE.ERROR;
        return next(err);
    }
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    Timeline.getSubList({
        'sub_user':req.params.id,
        'sub_status':1
    },page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取订阅列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;