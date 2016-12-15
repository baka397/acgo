'use strict';
/**
 * 邀请码管理
 */
const express = require('express');
const router = express.Router();
const Code = require('../../proxy/').Code;

//枚举
const STATUS_CODE = require('../../enums/status_code');
const tool = require('../../common/tool');

exports.requestMapping = '/code';

//路由处理
router.get('/',function(req,res,next){
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    if(!pageSize||pageSize>CONFIG.pageSize) pageSize=CONFIG.pageSize;
    let query = Object.create(null);
    Code.getList(query,'_id status use_user create_at update_at',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取邀请码列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.post('/',function(req,res,next){
    Code.newAndSave().then(function(result){
        res.send(tool.buildResJson('添加成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.put('/:id',function(req,res,next){
    let data=Object.create(null);
    data.status=req.body.status;
    data.useUser=req.body.useUser;
    Code.updateById(req.params.id,data).then(function(result){
        res.send(tool.buildResJson(req.body.useUser?'使用成功':'禁用成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

exports.router = router;