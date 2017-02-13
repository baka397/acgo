'use strict';
/**
 * 初始化请求
 */
const express = require('express');
const router = express.Router();
const RedisProxy = require('../../proxy/').Redis;

//枚举
const STATUS_CODE = require('../../enums/status_code');
const tool = require('../../common/tool');

exports.requestMapping = '/init';

//搜索引擎初始化
router.get('/search',function(req,res,next){
    RedisProxy.initSearchIndex().then(function(){
        res.send(tool.buildResJson('初始化搜索索引成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.REDIS_ERROR;
        next(err);
    });
});

exports.router = router;