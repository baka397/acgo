'use strict';
let models = require('../models');
let User = models.User;
let searchers = require('../searchers');
let UserSeacher = searchers.User;
let logger = require('../common/logger');
let tool = require('../common/tool');

/**
 * 根据用户名列表查找用户列表
 * @param {Array} names 用户名
 */
function getUsersByNames(names) {
    return new Promise((resolve, reject) => {
        UserSeacher.query(names).type('or').end((err, ids) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(ids);
        });
    });
};
exports.getUsersByNames = getUsersByNames;

/**
 * 根据ID查找用户列表
 * @param {Array} object_id 用户ID
 */
function getUserById(object_id) {
    return new Promise((resolve, reject) => {
        User.findById(object_id, (err, user) => {
            if (err) {
                logger.error('查询注册用户出错', err);
                reject('查询用户出错,请重新尝试');
                return;
            }
            resolve(user);
        });
    });
};
exports.getUserById = getUserById;

/**
 * 根据邮箱地址查找用户列表
 * @param {Array} email 邮箱地址
 */
function getUserByEmail(email) {
    let user = new User();
    return new Promise((resolve, reject) => {
        User.findOne({
            email: email
        }, (err, user) => {
            if (err) {
                logger.error('查询注册用户出错', err);
                reject('查询用户出错,请重新尝试');
                return;
            }
            resolve(user);
        });
    });
};
exports.getUserByEmail = getUserByEmail;

function getApiToken(email, password) {
    return new Promise((resolve, reject) => {
        getUserByEmail(email).then((user) => {
            let login_password = tool.md5password(password);
            if (!user || login_password !== user.password) {
                reject('用户名或密码错误');
                return;
            }
            user.save((err, data) => {
                if (err) {
                    logger.error('更新登录信息出错', err);
                    reject('登录出错,请重新尝试');
                    return;
                }
                resolve(data);
            });
        })
    })
}
exports.getApiToken = getApiToken;

function newAndSave(data) {
    let user = Object.assign(new User(), data);
    return new Promise((resolve, reject) => {
        user.save((err, data) => {
            if (err) {
                logger.error('保存用户信息出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            //设置索引
            UserSeacher.index(data.name, data._id);
            resolve(data);
        });
    });
};
exports.newAndSave = newAndSave;

/**
 * 更新用户
 * @param  {object} user       用户对象
 * @param  {object} data      用户数据
 */
function update(user,data) {
    return new Promise((resolve, reject) => {
        let new_user = Object.assign(user, data);
        new_user.save((err, data) => {
            if (err) {
                logger.error('更新用户信息出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.update = update;