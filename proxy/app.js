'use strict';
//应用操作
const App = require('../models').App;
/**
 * 新增应用
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    let app = new App();
    app.project_name = data.projectName;
    app.project_alias = data.projectAlias;
    app.user_name = data.userName;
    app.user_email = data.userEmail;
    return app.save();
}
/**
 * 根据应用ID更新应用
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateById(id,data){
    return getById(id).then(function(app){
        if(app){
            let saveData={};
            if(data.projectName) saveData.project_name = data.projectName;
            if(data.projectAlias) saveData.project_alias = data.projectAlias;
            if(data.userName) saveData.user_name = data.userName;
            if(data.userEmail) saveData.user_email = data.userEmail;
            Object.assign(app,saveData);
            return app.save();
        }
        else throw new Error('没有该数据');
    })
}
/**
 * 根据应用ID删除应用
 * @param  {String} id Object ID
 * @return {Object}    Promise对象
 */
function removeById(id){
    return getById(id).then(function(app){
        if(app){
            return app.remove();
        }
        else throw new Error('没有该数据');
    })
}
/**
 * 根据ID获取应用
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return App.findOne({_id: id});
}

/**
 * 根据别名获取应用
 * @param  {String} alias 别名
 * @return {Object}       Promise对象
 */
function getByAlias(alias){
    return App.findOne({project_alias: alias});
}

/**
 * 获取应用列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    if(!page||page<0) page=1;
    if(!pageSize||pageSize>CONFIG.maxPageSize) pageSize=CONFIG.pageSize;
    return Promise.all([App.count(query).exec(),App.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).sort({'_id':-1}).exec()]);
}
exports.newAndSave = newAndSave;
exports.updateById = updateById;
exports.getById = getById;
exports.getList = getList;
exports.removeById = removeById;
exports.getByAlias = getByAlias;