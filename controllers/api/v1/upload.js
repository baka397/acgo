'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const tool = require('../../../common/tool');
const uploadTool = require('../../../common/upload');

exports.requestMapping = '/upload';

router.get('/token',function(req,res){
    res.send(tool.buildResJson('获取成功',uploadTool.getUploadToken(req.user._id)));
});

exports.router = router;