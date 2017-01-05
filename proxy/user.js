'use strict';
//用户操作
const User = require('../models').User;
const Code = require('./code');
const auth = require('../common/auth');
const tool = require('../common/tool');
const validator = require('validator');
/**
 * 新增用户
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    if(!data.code) return tool.nextPromise(new Error('请输入邀请码'));
    if(!validator.isMongoId(data.code)) return tool.nextPromise(new Error('无效的邀请码'));
    let getCode;
    return Code.getById(data.code).then(function(code){
        if(code&&code.status===0){
            getCode=code;
            let user = new User();
            user.email = data.email;
            user.nickname = data.nickname;
            user.password = data.password?auth.md5Hash(CONFIG.pwSalt+data.password):'';
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
 * 根据用户ID更新用户
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
function updateById(id,data){
    return getById(id).then(function(user){
        if(user){
            let saveData={};
            if(data.nickname) saveData.nickname = data.nickname;
            if(data.password) saveData.password = auth.md5Hash(CONFIG.pwSalt+data.password);
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
 * 根据ID获取用户
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
function getByEmail(email){
    return User.findOne({email:email});
}
/**
 * 根据邮箱和密码登录
 * @param  {String} email    邮箱
 * @param  {String} password 密码
 * @return {Object}          Promise对象
 */
function login(email,password){
    return getByEmail(email).then(function(user){
        let error=new Error('错误的邮箱或密码');
        if(user){
            if(user.password===auth.md5Hash(CONFIG.pwSalt+password)){
                return auth.createLoginToken(user);
            }
            else throw error;
        }
        else throw error;
    })
}

/**
 * 退出用户
 * @param  {String} token 用户token
 * @return {Object}       Promise对象
 */
function logout(token){
    return auth.removeLoginToken(token);
}

/**
 * 获取用户列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    return Promise.all([User.count(query).exec(),User.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}
exports.newAndSave = newAndSave;
exports.updateById = updateById;
exports.getById = getById;
exports.login = login;
exports.logout = logout;
exports.getList = getList;