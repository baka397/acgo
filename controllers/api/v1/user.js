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
    User.newAndSave(data).then(function(){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
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
    };
    User.getList(queryData,'_id nickname avatar avatar_clip desc',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.get('/:id',function(req,res,next){
    let userPromise;
    switch(req.params.id){
    case 'me':
        userPromise=User.getById(req.user._id);
        break;
    default:
        if(!validator.isMongoId(req.params.id)){
            let err=new Error('错误的用户');
            err.status=STATUS_CODE.ERROR;
            return next(err);
        }
        userPromise=User.getById(req.params.id);
    }
    userPromise.then(function(user){
        let returnData = {
            _id:user._id,
            nickname:user.nickname,
            avatar:user.avatar||'',
            avatar_clip:user.avatar_clip,
            desc:user.desc||''
        };
        switch(req.params.id){
        case 'me':
            returnData.role=req.user.role;
            break;
        }
        res.send(tool.buildResJson('获取信息成功',returnData));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.post('/send',function(req,res,next){
    let email=req.body.email;
    let backurl=req.body.backurl;
    if(!email||!validator.isEmail(email)){
        let error=new Error('请输入正确的邮箱');
        error.status=STATUS_CODE.ERROR;
        return next(error);
    }
    if(!backurl||!validator.isURL(backurl)){
        let error=new Error('请输入正确的回调地址');
        error.status=STATUS_CODE.ERROR;
        return next(error);
    }
    User.sendPwMail(email,backurl).then(function(){
        res.send(tool.buildResJson('已发送密码邮件,请及时查收.如果没有收到请注意垃圾邮箱.',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.post('/reset',function(req,res,next){
    let data=Object.create(null);
    data.password=req.body.password;
    data.resetToken=req.body.resetToken;
    User.resetPassword(data).then(function(){
        res.send(tool.buildResJson('重置成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.put('/me',function(req,res,next){
    let data=Object.create(null);
    data.oldPassword=req.body.oldPassword;
    data.password=req.body.password;
    data.nickname=req.body.nickname;
    data.avatar=req.body.avatar;
    data.avatarClip=req.body.avatarClip;
    data.desc=req.body.desc;
    User.updateById(req.user._id,data,true).then(function(){
        res.send(tool.buildResJson('更新成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});
router.delete('/me',function(req,res,next){
    User.logout(req.header('x-req-key')).then(function(){
        res.send(tool.buildResJson('登出成功',null));
    }).catch(function(err){
        next(err);
    });
});

exports.router = router;