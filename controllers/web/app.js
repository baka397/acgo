'use strict';
/**
 * APP管理
 */
const express = require('express');
const router = express.Router();
const App = require('../../proxy/').App;

//枚举
const STATUS_CODE = require('../../enums/status_code');
const tool = require('../../common/tool');

exports.requestMapping = '/app';

//路由处理
router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let query = Object.create(null);
    App.getList(query,'_id user_email user_name project_alias project_name update_at',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取应用列表成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.projectName=req.body.projectName;
    data.projectAlias=req.body.projectAlias;
    data.userName=req.body.userName;
    data.userEmail=req.body.userEmail;
    App.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.put('/:id',function(req,res,next){
    let data=Object.create(null);
    data.projectName=req.body.projectName;
    data.projectAlias=req.body.projectAlias;
    data.userName=req.body.userName;
    data.userEmail=req.body.userEmail;
    App.updateById(req.params.id,data).then(function(result){
        res.send(tool.buildResJson('修改成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.delete('/:id',function(req,res,next){
    App.removeById(req.params.id).then(function(result){
        res.send(tool.buildResJson('删除成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

exports.router = router;