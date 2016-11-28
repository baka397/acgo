'use strict';
/**
 * API 限制方法
 */

//载入配置
var config= require('../config');

var UserProxy = require('../proxy').User;

//加载工具
var tool= require('../common/tool');
var logger = require('../common/logger');
var redis= require('../common/redis');

//检测登录
exports.authLogin = function(req, res , next){
    let api_token = req.get('API-TOKEN')||req.get('api-token');
    if(api_token){
        let object_id = tool.unpackApiToken(api_token);
        UserProxy.getUserById(object_id).then((user)=>{
            //设置用户数据
            if(user){
                req.user=user;
            }
            next();
        }).catch(err=>{
            next();
        })
    }else{
        next();
    }
}

exports.authAction = function(req,res,next){
    //检测登录用户
    if(!req.user){
        next({
            status:403,
            msg:'你需要登录才可继续使用'
        });
        return false;
    }
    if(req.user.is_block){
        next({
            status:403,
            msg:'你已经被加入黑名单,不能进行任何操作'
        });
        return false;
    }
    //检测权限
    if(!req.action){
        let key='action:'+req.action;
        let role_key='role:'+req.user.alias;
        //创建pipeline
        let pipeline = redis.pipeline();
        pipeline.get(key).get(role_key).exec((err,result)=>{
            if(err){
                next({
                    status:403,
                    msg:'你没有权限使用这个功能'
                });
                return false;
            }
            //检测权限,待做
            
            next();
        });
    }
}