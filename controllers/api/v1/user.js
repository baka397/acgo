'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const User = require('../../../proxy/').User;

//枚举
const STATUS_CODE = require('../../../enums/status_code');
const tool = require('../../../common/tool');

exports.requestMapping = '/user';


router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.email=req.body.email;
    data.nickname=req.body.nickname;
    data.password=req.body.password;
    data.code=req.body.code;
    User.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})


exports.router = router;