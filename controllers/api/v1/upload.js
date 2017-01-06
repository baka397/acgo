'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const tool = require('../../../common/tool');
const uploadTool = require('../../../common/upload');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/upload';

router.get('/token',function(req,res,next){
    res.send(tool.buildResJson('获取成功',uploadTool.getUploadToken(req.user._id)));
});

exports.router = router;