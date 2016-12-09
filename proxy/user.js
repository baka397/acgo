'use strict';
//用户操作
const User = require('../models').User;
const Code = require('./code');
const auth = require('../common/auth');
const validator = require('validator');
/**
 * 新增用户
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    if(!data.code) return new Promise(function(resolve,reject){
        reject(new Error('请输入邀请码'));
    })
    if(!validator.isMongoId(data.code)) return new Promise(function(resolve,reject){
        reject(new Error('无效的邀请码'));
    })
    let getCode;
    return Code.getById(data.code).then(function(code){
        if(code&&code.status===0){
            getCode=code;
            let user = new User();
            user.email = data.email;
            user.nickname = data.nickname;
            user.password = data.password?auth.md5Hash(data.password):'';
            return user.save()
        }
        else throw new Error('无效的邀请码');
    }).then(function(saveUser){
        return Code.updateById(getCode,{
            status:1,
            useUser:saveUser._id
        })
    })
}
/**
 * 根据邀请码ID更新用户
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateById(id,data){
    return getById(id).then(function(user){
        if(user){
            let saveData={};
            if(data.nickname) saveData.nickname = data.nickname;
            if(data.password) saveData.password = auth.md5Hash(data.password);
            Object.assign(user,saveData);
            return user.save();
        }
        else throw new Error('没有该数据');
    })
}
/**
 * 根据ID获取用户
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getById(id){
    return User.findOne({_id: id});
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
    return Promise.all([User.count(query).exec(),User.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).sort({'_id':-1}).exec()]);
}
exports.newAndSave = newAndSave;
exports.updateById = updateById;
exports.getById = getById;
exports.getList = getList;