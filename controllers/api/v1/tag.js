'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const Tag = require('../../../proxy/').Tag;
const tool = require('../../../common/tool');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/tag';

router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.type=parseInt(req.body.type);
    data.name=req.body.name;
    data.alias=req.body.alias;
    Tag.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})
router.get('/',function(req,res,next){
    let page = parseInt(req.query.page)||1;
    let pageSize = parseInt(req.query.pageSize)
    if(!pageSize||pageSize>CONFIG.pageSize) pageSize=CONFIG.pageSize;
    req.query.type=parseInt(req.query.type);
    Tag.search(req.query.keyword,req.query.type,'_id name alias type',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;