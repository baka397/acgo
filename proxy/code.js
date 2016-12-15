'use strict';
//邀请码操作
const Code = require('../models').Code;
/**
 * 新增邀请码
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    let code = new Code();
    code.status = 0;
    return code.save();
}
/**
 * 根据邀请码ID更新应用
 * @param  {String} id   Object ID,如果为对象,则为已查出的邀请码对象
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateById(id,data){
    if(typeof id ==='string'){
        return getById(id).then(function(code){
            if(code){
                let saveData={};
                if(data.status===1||data.status===-1){
                    saveData.status = data.status;
                }else{
                    throw new Error('错误的状态');
                }
                if(data.useUser) saveData.use_user = data.useUser;
                else if(data.status===1) throw new Error('请指定使用用户');
                Object.assign(code,saveData);
                return code.save();
            }
            else throw new Error('没有该数据');
        })
    }else{
        Object.assign(id,data);
        return id.save();
    }
}
/**
 * 根据ID获取应用
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return Code.findOne({_id: id});
}

/**
 * 获取邀请码列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    if(!page||page<0) page=1;
    if(!pageSize||pageSize>CONFIG.maxPageSize) pageSize=CONFIG.pageSize;
    return Promise.all([Code.count(query).exec(),Code.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).sort({'_id':-1}).exec()]);
}
exports.newAndSave = newAndSave;
exports.updateById = updateById;
exports.getById = getById;
exports.getList = getList;