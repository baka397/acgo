'use strict';
//加载依赖
let express = require('express');
let router = express.Router();
let config = require('./config');

let api_path = './api/v'+config.api_version;
let api_link='/'+config.api_version;
//api
let user = require(api_path+'/user');
let menu = require(api_path+'/menu');
let action = require(api_path+'/action');
let role = require(api_path+'/role');
let code = require(api_path+'/code');
let upload = require(api_path+'/upload');
let playlist = require(api_path+'/playlist');
let resource = require(api_path+'/resource');

//用户
router.post(api_link+'/user/register/',user.register);
router.post(api_link+'/user/login/',user.login);
router.put(api_link+'/user/role/',user.editUserRole);
router.get(api_link+'/user/me/',user.getUserMe);

//权限目录
router.post(api_link+'/menuCate/',menu.addMenuCate);
router.put(api_link+'/menuCate/',menu.editMenuCate);
router.get(api_link+'/menuCate/',menu.getMenuCates);
router.get(api_link+'/menuCate/:id',menu.getMenuCateById);
router.delete(api_link+'/menuCate/:id',menu.removeMenuCateById);
router.post(api_link+'/menu/',menu.addMenu);
router.put(api_link+'/menu/',menu.editMenu);
router.get(api_link+'/menu/',menu.getMenus);
router.get(api_link+'/menu/:id',menu.getMenuById);
router.delete(api_link+'/menu/:id',menu.removeMenuById);

router.post(api_link+'/actionCate/',action.addActionCate);
router.put(api_link+'/actionCate/',action.editActionCate);
router.get(api_link+'/actionCate/',action.getActionCates);
router.get(api_link+'/actionCate/:id',action.getActionCateById);
router.delete(api_link+'/actionCate/:id',action.removeActionCateById);
router.post(api_link+'/action/',action.addAction);
router.put(api_link+'/action/',action.editAction);
router.get(api_link+'/action/',action.getActions);
router.get(api_link+'/action/:id',action.getActionById);
router.delete(api_link+'/action/:id',action.removeActionById);

//角色
router.post(api_link+'/role/',role.addRole);
router.put(api_link+'/role/',role.editRole);
router.get(api_link+'/role/',role.getRoles);
router.get(api_link+'/role/:id',role.getRoleById);
router.delete(api_link+'/role/:id',role.removeRoleById);
router.get(api_link+'/roleSync/',role.sync);

//邀请码
router.post(api_link+'/code/',code.addCode);
router.get(api_link+'/code/',code.getCodes);

//上传
router.get(api_link+'/upload/',upload.getUpToken);

//播放列表
router.get(api_link+'/playlist/me/',playlist.getPlaylistMe);

//资源
router.get(api_link+'/resource/:id',resource.getResourceDetail);

module.exports = router;