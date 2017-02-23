'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const Analytics = require('../../../proxy/').Analytics;
const tool = require('../../../common/tool');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/analytics';

router.get('/dimension/:id',function(req,res,next){
    Analytics.getRecommenderTopResult(req.params.id,global.CONFIG.dimensionTopNum).then(function(result){
        res.send(tool.buildResJson('获取分析数据成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.REDIS_ERROR;
        next(err);
    });
});

exports.router = router;