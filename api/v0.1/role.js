'use strict';
let validator = require('validator');
let RoleProxy = require('../../proxy').Role;
//载入工具
let tool = require('../../common/tool');
let redis= require('../../common/redis');

//添加
exports.addRole = function(req, res, next) {
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let menus = req.body.menus ? req.body.menus : '';
    let actions = req.body.actions ? req.body.actions : '';
    let alias = req.body.alias ? tool.xss(req.body.alias) : '';
    let alias_reg = new RegExp(/^[a-z0-9\-\_]{4,12}$/);
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '角色名称必须2-12位'
        });
        return false;
    }
    if (!alias_reg.test(alias)) {
        next({
            status: 101,
            msg: '错误的别名'
        });
        return false;
    }
    if (!Array.isArray(menus)&&menus.length===0) {
        next({
            status: 101,
            msg: '错误的目录列表'
        });
        return false;
    }
    if (!Array.isArray(actions)&&actions.length===0) {
        next({
            status: 101,
            msg: '错误的权限列表'
        });
        return false;
    }
    RoleProxy.getRoleByAlias(alias).then((role) => {
        if (role) {
            return new Promise((resolve, reject) => {
                reject('角色别名重复');
            });
        }
        return RoleProxy.newAndSave({
            name:name,
            menus:menus,
            actions:actions,
            alias:alias
        })
    }).then(() => {
        res.send(tool.rebuildResJson('添加角色成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

//编辑
exports.editRole = function(req, res, next) {
    let id = req.body.id?tool.xss(req.body.id):'';
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let menus = req.body.menus ? req.body.menus : '';
    let actions = req.body.actions ? req.body.actions : '';
    if(!id){
        next({
            status:101,
            msg:'错误的角色id'
        });
        return false;
    }
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '角色名称必须2-12位'
        });
        return false;
    }
    if (!Array.isArray(menus)&&menus.length===0) {
        next({
            status: 101,
            msg: '错误的目录列表'
        });
        return false;
    }
    if (!Array.isArray(actions)&&actions.length===0) {
        next({
            status: 101,
            msg: '错误的权限列表'
        });
        return false;
    }
    RoleProxy.getRoleById(id).then((role)=>{
        return RoleProxy.update(role,{
            name:name,
            menus:menus,
            actions:actions
        });
    }).then(()=>{
        res.send(tool.rebuildResJson('编辑角色成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

//获取列表
exports.getRoles=function(req,res,next){
    Promise.all([RoleProxy.getRoles({},'_id name alias'),RoleProxy.getRolesCount({})]).then((results)=>{
        res.send(tool.rebuildResJson('查询角色列表成功',{
            count:results[1],
            list:results[0]
        }));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.getRoleById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的角色id'
        });
        return false;
    }
    RoleProxy.getRoleById(id,'_id name alias menus actions').then(role=>{
        res.send(tool.rebuildResJson('查询角色成功',role));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

//同步
exports.sync = function(req, res, next) {
    RoleProxy.getRoles({},'name alias menus actions').then(roles=>{
        //创建redis pipeline
        let pipeline = redis.pipeline();
        roles.forEach(cur_role=>{
            let role_key='role:'+cur_role.alias;
            let role_value=JSON.stringify({
                name:cur_role.name,
                menus:cur_role.menus,
                actions:cur_role.actions
            });
            pipeline.set(role_key,role_value);
        });
        pipeline.exec((err, results)=>{
            if(err){
                logger.error('redis同步角色失败', err);
                next({
                    status:101,
                    msg:'同步失败'
                });
                return false;
            }
            res.send(tool.rebuildResJson('同步成功'));
        });
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    });
}

exports.removeRoleById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的角色id'
        });
        return false;
    }
    RoleProxy.getRoleById(id).then(action=>{
        return RoleProxy.remove(action);
    }).then(()=>{
        res.send(tool.rebuildResJson('删除权限成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}