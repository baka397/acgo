'use strict';
var validator = require('validator');
var MenuProxy = require('../proxy').Menu;
//载入工具
var tool = require('../common/tool');
var logger = require('../common/logger');

const MENU_TYPE = require('../enums/menu').MENU_TYPE;

//首页
exports.index = function(req, res, next) {
    //获取目录分类列表
    MenuProxy.getMenus({
        type:MENU_TYPE.CATE
    },'name').then((menus)=>{
        res.render('index',{
            menus:menus
        });
    }).catch((err)=>{
        logger.error('获取首页数据出错', err);
        res.render('index',{});
    })
}