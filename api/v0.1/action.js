'use strict';
let validator = require('validator');
let ActionProxy = require('../../proxy').Action;
//载入工具
let tool = require('../../common/tool');
let redis= require('../../common/redis');

const ACTION_TYPE = require('../../enums/action').ACTION_TYPE;
const POST_TYPE = require('../../enums/common').POST_TYPE;

//添加分类
exports.addActionCate = function(req, res, next) {
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let type = ACTION_TYPE.CATE;
    let order = req.body.order ? parseInt(tool.xss(req.body.order)) : 0;
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '分类名称必须2-12位'
        });
        return false;
    }
    if (!order && order < 0) {
        next({
            status: 101,
            msg: '请填写正确的排序'
        });
        return false;
    }
    ActionProxy.newAndSave({
        type: type,
        name: name,
        order: order
    }).then(() => {
        res.send(tool.rebuildResJson('添加权限分类成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

//编辑分类
exports.editActionCate = function(req, res, next) {
    let id = req.body.id ? tool.xss(req.body.id) : '';
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let order = req.body.order ? parseInt(tool.xss(req.body.order)) : 0;
    if (!id) {
        next({
            status: 101,
            msg: '错误的目录分类id'
        });
        return false;
    }
    if (!order && order < 0) {
        next({
            status: 101,
            msg: '请填写正确的排序'
        });
        return false;
    }
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '分类名称必须2-12位'
        });
        return false;
    }
    ActionProxy.getActionById(id).then((action) => {
        if (!action || action.type !== ACTION_TYPE.CATE) {
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return ActionProxy.update(action, {
            name: name,
            order: order
        });
    }).then(() => {
        res.send(tool.rebuildResJson('编辑权限分类成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

//添加
exports.addAction = function(req, res, next) {
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let type = ACTION_TYPE.ACTION;
    let order = req.body.order ? parseInt(tool.xss(req.body.order)) : 0;
    let parent = req.body.parent ? tool.xss(req.body.parent) : '';
    let post_type = req.body.post_type ? parseInt(req.body.post_type) : 0;
    let alias = req.body.alias ? tool.xss(req.body.alias) : '';
    let alias_reg = new RegExp(/^[a-z0-9\-\_]{4,12}$/);
    let path = req.body.path?tool.xss(req.body.path):'';
    let path_reg = new RegExp(/^\/([a-zA-Z])+\/([a-zA-Z]+\/||)$/);
    if (!parent) {
        next({
            status: 101,
            msg: '请选择目录分类'
        });
        return false;
    }
    if (!post_type || !(post_type === POST_TYPE.GET || post_type === POST_TYPE.POST || post_type === POST_TYPE.PUT || post_type === POST_TYPE.DELETE)) {
        next({
            status: 101,
            msg: '错误的权限类型'
        });
        return false;
    }
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '目录名称必须2-12位'
        });
        return false;
    }
    if (!order && order < 0) {
        next({
            status: 101,
            msg: '请填写正确的排序'
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
    if(!path_reg.test(path)){
        next({
            status:101,
            msg:'错误的地址形式'
        });
        return false;
    }
    ActionProxy.getActionByAlias(alias).then((action) => {
        if (action) {
            return new Promise((resolve, reject) => {
                reject('权限别名重复');
            });
        }
        return ActionProxy.getActionById(parent);
    }).then((action) => {
        if(!action || action.type !== ACTION_TYPE.CATE) {
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return ActionProxy.newAndSave({
            type: type,
            name: name,
            order: order,
            parent_id: parent,
            post_type: post_type,
            alias: alias,
            path:path
        })
    }).then((data) => {
        //添加权限缓存
        let key='action:'+alias;
        redis.set(key,data._id);
        res.send(tool.rebuildResJson('添加权限成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

//编辑
exports.editAction = function(req, res, next) {
    let id = req.body.id ? tool.xss(req.body.id) : '';
    let name = req.body.name ? tool.xss(req.body.name) : '';
    let order = req.body.order ? parseInt(tool.xss(req.body.order)) : 0;
    let parent = req.body.parent ? tool.xss(req.body.parent) : '';
    let post_type = req.body.post_type ? parseInt(req.body.post_type) : 0;
    let path = req.body.path?tool.xss(req.body.path):'';
    let path_reg = new RegExp(/^\/([a-zA-Z])+\/([a-zA-Z]+\/||)$/);
    if (!id) {
        next({
            status: 101,
            msg: '错误的目录id'
        });
        return false;
    }
    if (!post_type || !(post_type === POST_TYPE.GET || post_type === POST_TYPE.POST || post_type === POST_TYPE.PUT || post_type === POST_TYPE.DELETE)) {
        next({
            status: 101,
            msg: '错误的权限类型'
        });
        return false;
    }
    if (!parent) {
        next({
            status: 101,
            msg: '请选择目录分类'
        });
        return false;
    }
    if (!order && order < 0) {
        next({
            status: 101,
            msg: '请填写正确的排序'
        });
        return false;
    }
    if (!validator.isLength(name, {
            min: 2,
            max: 12
        })) {
        next({
            status: 101,
            msg: '目录名称必须2-12位'
        });
        return false;
    }
    if(!path_reg.test(path)){
        next({
            status:101,
            msg:'错误的地址形式'
        });
        return false;
    }
    ActionProxy.getActionById(parent).then((action) => {
        if (!action || action.type !== ACTION_TYPE.CATE) {
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return ActionProxy.getActionById(id)
    }).then((action) => {
        if (!action || action.type !== ACTION_TYPE.ACTION) {
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return ActionProxy.update(action, {
            name: name,
            order: order,
            path: path,
            parent_id: parent,
            path: path
        });
    }).then(() => {
        res.send(tool.rebuildResJson('编辑权限成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

exports.getActionCates = function(req, res, next) {
    Promise.all([ActionProxy.getActions({
        type:ACTION_TYPE.CATE
    },'name'),ActionProxy.getActionsCount({
        type:ACTION_TYPE.CATE
    })]).then((results)=>{
        res.send(tool.rebuildResJson('查询权限分类成功',{
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

exports.getActions = function(req, res, next) {
    let parent_id = req.query.parent?tool.xss(req.query.parent):'';
    let params={
        type:ACTION_TYPE.ACTION
    }
    if(parent_id){
        params.parent_id=parent_id;
    }
    Promise.all([ActionProxy.getActions(params,'_id name path post_type alias parent_id'),ActionProxy.getActionsCount(params)]).then((results)=>{
        res.send(tool.rebuildResJson('查询权限成功',{
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

exports.getActionCateById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的权限id'
        });
        return false;
    }
    ActionProxy.getActionById(id,'_id name order').then(menu=>{
        res.send(tool.rebuildResJson('查询权限分类成功',menu));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.getActionById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的权限id'
        });
        return false;
    }
    ActionProxy.getActionById(id,'_id name path post_type alias order parent_id').then(menu=>{
        res.send(tool.rebuildResJson('查询权限成功',menu));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.removeActionCateById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的权限id'
        });
        return false;
    }
    let cur_action;
    ActionProxy.getActionById(id).then(action=>{
        cur_action=action;
        return ActionProxy.getActions({
            type:ACTION_TYPE.ACTION,
            parent_id:cur_action._id
        });
    }).then((actions)=>{
        if(actions.length>0){
            return new Promise((resolve, reject) => {
                reject('该分类下有权限数据,请先删除权限');
            });
        }
        else return ActionProxy.remove(cur_action);
    }).then(()=>{
        res.send(tool.rebuildResJson('删除分类成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.removeActionById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的权限id'
        });
        return false;
    }
    ActionProxy.getActionById(id).then(action=>{
        return ActionProxy.remove(action);
    }).then(()=>{
        res.send(tool.rebuildResJson('删除权限成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}