'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const User = require('../../../proxy/').User;
const tool = require('../../../common/tool');
const validator = require('validator');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

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
router.post('/login',function(req,res,next){
    let data=Object.create(null);
    data.email=req.body.email;
    data.password=req.body.password;
    if(!data.email||!data.password||!validator.isEmail(data.email)){
        let error=new Error('请输入正确的邮箱或密码');
        error.status=STATUS_CODE.ERROR;
        return next(error);
    }
    User.login(data.email,data.password).then(function(result){
        res.send(tool.buildResJson('登录成功',result));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let ids=req.query.ids;
    if(!ids){
        let err = new Error('请指定查询的用户ID');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    ids=ids.split(',');
    if(ids.length>5){
        let err = new Error('最多只能查询5条数据');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    if(!ids.every(function(id){
        return validator.isMongoId(id);
    })){
        let err = new Error('无效的数据');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    let queryData={
        '_id':{
            $in:ids
        }
    }
    User.getList(queryData,'_id nickname',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.get('/me',function(req,res,next){
    User.getById(req.user._id).then(function(user){
        let returnData = Object.assign({},req.user,{
            nickname:user.nickname
        });
        //清除敏感信息
        delete returnData.password;
        res.send(tool.buildResJson('获取信息成功',returnData));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.put('/me',function(req,res,next){
    let data=Object.create(null);
    data.nickname=req.body.nickname;
    User.updateById(req.user._id,data).then(function(result){
        res.send(tool.buildResJson('更新成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

exports.router = router;