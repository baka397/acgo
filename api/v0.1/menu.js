'use strict';
let validator = require('validator');
let MenuProxy = require('../../proxy').Menu;
//载入工具
let tool = require('../../common/tool');

const MENU_TYPE = require('../../enums/menu').MENU_TYPE;

//添加目录分类
exports.addMenuCate = function(req, res, next) {
    let name = req.body.name?tool.xss(req.body.name):'';
    let type = MENU_TYPE.CATE;
    let order = req.body.order?parseInt(req.body.order):0;
    if(!validator.isLength(name,{
        min:2,
        max:12
    })){
        next({
            status:101,
            msg:'分类名称必须2-12位'
        });
        return false;
    }
    if(!order&&order<0){
        next({
            status:101,
            msg:'请填写正确的排序'
        });
        return false;
    }
    MenuProxy.newAndSave({
        type:type,
        name:name,
        order:order
    }).then(()=>{
        res.send(tool.rebuildResJson('添加目录分类成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

//编辑目录
exports.editMenuCate = function(req, res, next) {
    let id = req.body.id?tool.xss(req.body.id):'';
    let name = req.body.name?tool.xss(req.body.name):'';
    let order = req.body.order?parseInt(req.body.order):0;
    if(!id){
        next({
            status:101,
            msg:'错误的目录分类id'
        });
        return false;
    }
    if(!order&&order<0){
        next({
            status:101,
            msg:'请填写正确的排序'
        });
        return false;
    }
    if(!validator.isLength(name,{
        min:2,
        max:12
    })){
        next({
            status:101,
            msg:'分类名称必须2-12位'
        });
        return false;
    }
    MenuProxy.getMenuById(id).then((menu)=>{
        if(!menu||menu.type!==MENU_TYPE.CATE){
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return MenuProxy.update(menu,{
            name:name,
            order:order
        });
    }).then(()=>{
        res.send(tool.rebuildResJson('编辑目录分类成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

//添加目录
exports.addMenu = function(req, res, next) {
    let name = req.body.name?tool.xss(req.body.name):'';
    let path = req.body.path?tool.xss(req.body.path):'';
    let path_reg = new RegExp(/^\/([a-zA-Z])+\/([a-zA-Z]+\/||)$/);
    let type = MENU_TYPE.MENU;
    let order = req.body.order?parseInt(req.body.order):0;
    let parent = req.body.parent?tool.xss(req.body.parent):'';
    if(!parent){
        next({
            status:101,
            msg:'请选择目录分类'
        });
        return false;
    }
    if(!validator.isLength(name,{
        min:2,
        max:12
    })){
        next({
            status:101,
            msg:'目录名称必须2-12位'
        });
        return false;
    }
    if(!order&&order<0){
        next({
            status:101,
            msg:'请填写正确的排序'
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
    MenuProxy.getMenuById(parent).then((menu)=>{
        if(!menu||menu.type!==MENU_TYPE.CATE){
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return MenuProxy.newAndSave({
            type:type,
            name:name,
            path:path,
            order:order,
            parent_id:parent
        })
    }).then(()=>{
        res.send(tool.rebuildResJson('添加目录成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

//编辑目录
exports.editMenu = function(req, res, next) {
    let id = req.body.id?tool.xss(req.body.id):'';
    let name = req.body.name?tool.xss(req.body.name):'';
    let path = req.body.path?tool.xss(req.body.path):'';
    let path_reg = new RegExp(/^\/([a-zA-Z])+\/([a-zA-Z]+\/||)$/);
    let order = req.body.order?parseInt(req.body.order):0;
    let parent = req.body.parent?tool.xss(req.body.parent):'';
    if(!id){
        next({
            status:101,
            msg:'错误的目录id'
        });
        return false;
    }
    if(!parent){
        next({
            status:101,
            msg:'请选择目录分类'
        });
        return false;
    }
    if(!order&&order<0){
        next({
            status:101,
            msg:'请填写正确的排序'
        });
        return false;
    }
    if(!validator.isLength(name,{
        min:2,
        max:12
    })){
        next({
            status:101,
            msg:'目录名称必须2-12位'
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
    MenuProxy.getMenuById(parent).then((menu)=>{
        if(!menu||menu.type!==MENU_TYPE.CATE){
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return MenuProxy.getMenuById(id)
    }).then((menu)=>{
        if(!menu||menu.type!==MENU_TYPE.MENU){
            return new Promise((resolve, reject) => {
                reject('错误的数据');
            });
        }
        return MenuProxy.update(menu,{
            name:name,
            order:order,
            path:path,
            parent_id:parent
        });
    }).then(()=>{
        res.send(tool.rebuildResJson('编辑目录成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.getMenuCates = function(req, res, next) {
    Promise.all([MenuProxy.getMenus({
        type:MENU_TYPE.CATE
    },'name'),MenuProxy.getMenusCount({
        type:MENU_TYPE.CATE
    })]).then((results)=>{
        res.send(tool.rebuildResJson('查询目录分类成功',{
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

exports.getMenus = function(req, res, next) {
    let parent_id = req.query.parent?tool.xss(req.query.parent):'';
    let params={
        type:MENU_TYPE.MENU
    }
    if(parent_id){
        params.parent_id=parent_id;
    }
    Promise.all([MenuProxy.getMenus(params,'name path parent_id'),MenuProxy.getMenusCount(params)]).then((results)=>{
        res.send(tool.rebuildResJson('查询目录成功',{
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

exports.getMenuCateById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的目录id'
        });
        return false;
    }
    MenuProxy.getMenuById(id,'_id name order').then(menu=>{
        res.send(tool.rebuildResJson('查询目录分类成功',menu));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.getMenuById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的目录id'
        });
        return false;
    }
    MenuProxy.getMenuById(id,'_id name order parent_id path').then(menu=>{
        res.send(tool.rebuildResJson('查询目录成功',menu));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.removeMenuCateById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的目录id'
        });
        return false;
    }
    let cur_menu;
    MenuProxy.getMenuById(id).then(menu=>{
        cur_menu=menu;
        return MenuProxy.getMenus({
            type:MENU_TYPE.MENU,
            parent_id:cur_menu._id
        });
    }).then((menus)=>{
        if(menus.length>0){
            return new Promise((resolve, reject) => {
                reject('该分类下有目录数据,请先删除目录');
            });
        }
        else return MenuProxy.remove(cur_menu);
    }).then(()=>{
        res.send(tool.rebuildResJson('删除分类成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}

exports.removeMenuById = function(req, res, next){
    let id = req.params.id?tool.xss(req.params.id):'';
    if(!id){
        next({
            status:101,
            msg:'错误的目录id'
        });
        return false;
    }
    MenuProxy.getMenuById(id).then(menu=>{
        return MenuProxy.remove(menu);
    }).then(()=>{
        res.send(tool.rebuildResJson('删除目录成功'));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}