'use strict';
let validator = require('validator');
let UserProxy = require('../../proxy').User;
let RoleProxy = require('../../proxy').Role;
let MenuProxy = require('../../proxy').Menu;
//载入工具
let tool = require('../../common/tool');
let redis= require('../../common/redis');

//注册
exports.register = function(req, res, next) {
    let email = req.body.email?tool.xss(req.body.email):'';
    let password = req.body.password?tool.xss(req.body.password):'';
    let name = req.body.name?tool.xss(req.body.name):'';
    if(!validator.isEmail(email)){
        next({
            status:101,
            msg:'邮箱格式错误'
        });
        return false;
    }
    if(!validator.isLength(password,{
        min:6,
        max:32
    })){
        next({
            status:101,
            msg:'密码必须6-32位'
        });
        return false;
    }
    if(!validator.isLength(name,{
        min:2,
        max:12
    })){
        next({
            status:101,
            msg:'昵称必须2-12位'
        });
        return false;
    }
    UserProxy.getUserByEmail(email).then((data)=>{
        if(data){
            return new Promise((resolve, reject)=>{
                reject('重复的邮箱地址');
            });
        }
        return UserProxy.newAndSave({
            email:email,
            password:tool.md5password(password),
            name:name,
            role:'normal'
        });
    }).then(()=>{
        res.send(tool.rebuildResJson('注册成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    });
}

//登录
exports.login = function(req,res,next){
    let email = req.body.email?tool.xss(req.body.email):'';
    let password = req.body.password?tool.xss(req.body.password):'';
    if(!validator.isEmail(email)){
        next({
            status:101,
            msg:'邮箱格式错误'
        });
        return false;
    }
    if(!validator.isLength(password,{
        min:6,
        max:32
    })){
        next({
            status:101,
            msg:'密码必须6-32位'
        });
        return false;
    }
    let token;
    UserProxy.getApiToken(email,password).then((data)=>{
        token=data.api_token;
        let role_key='role:'+data.role;
        return redis.get(role_key); //查询缓存角色
    }).then((role)=>{
        let role_object=JSON.parse(role);
        return MenuProxy.getMenuByIds(role_object.menus,'-_id name path parent_id');
    }).then((menus)=>{
        res.send(tool.rebuildResJson('登录成功',{
            api_token:token,
            menus:menus
        }));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    });
}

//编辑用户角色
exports.editUserRole = function(req,res,next){
    let id = req.body.id?tool.xss(req.body.id):'';
    let role_alias = req.body.role?tool.xss(req.body.role):'';
    if(!id){
        next({
            status:101,
            msg:'错误的用户'
        });
        return false;
    }
    if(!role_alias){
        next({
            status:101,
            msg:'错误的角色'
        });
        return false;
    }
    RoleProxy.getRoleByAlias(role_alias).then((role) => {
        if (!role) {
            return new Promise((resolve, reject) => {
                reject('错误的角色');
            });
        }
        return UserProxy.getUserById(id);
    }).then((user) => {
        if (!user) {
            return new Promise((resolve, reject) => {
                reject('错误的用户');
            });
        }
        return UserProxy.update(user,{
            role:role_alias
        });
    }).then(()=>{
        res.send(tool.rebuildResJson('编辑用户角色成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

//获取用户数据
exports.getUserMe = function(req,res,next){
    tool.createStaticOutput('./api/static/user/me.json').then((data)=>{
        res.send(tool.rebuildResJson('获取用户数据成功',data));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}