'use strict';
let models = require('../models');
let Action = models.Action;
let logger = require('../common/logger');

/**
 * 根据ID查找权限
 * @param {Array} object_id 权限ID
 */
function getActionById(object_id,keys) {
    return new Promise((resolve, reject) => {
        Action.findById(object_id,keys, (err, data) => {
            if (err) {
                logger.error('查询权限出错', err);
                reject('错误的权限id,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};
exports.getActionById = getActionById;

/**
 * 根据别名查找权限
 * @param {Array} alias 权限别名
 */
function getActionByAlias(alias) {
    return new Promise((resolve, reject) => {
        Action.findOne({
            alias: alias
        }, (err, action) => {
            if (err) {
                logger.error('查询权限出错', err);
                reject('查询权限出错,请重新尝试');
                return;
            }
            resolve(action);
        });
    });
};
exports.getActionByAlias = getActionByAlias;

function getActions(param,keys) {
    return new Promise((resolve, reject) => {
        let query=Action.find(param).sort('order');
        if(keys){
            query.select(keys);
        }
        query.exec((err, data) => {
            if (err) {
                logger.error('查询权限列表出错', err);
                reject('错误的权限查询条件,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
}
exports.getActions = getActions;

function getActionsCount(param) {
    return new Promise((resolve, reject) => {
        let query=Action.find(param).count((err, count) => {
            if (err) {
                logger.error('查询权限数量出错', err);
                reject('错误的权限查询条件,请重新尝试');
                return;
            }
            resolve(count);
        });
    });
}
exports.getActionsCount = getActionsCount;

/**
 * 增加权限
 * @param  {object} data 权限数据
 */
function newAndSave(data) {
    let action = Object.assign(new Action(), data);
    return new Promise((resolve, reject) => {
        action.save((err, data) => {
            if (err) {
                logger.error('保存权限出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.newAndSave = newAndSave;

/**
 * 更新权限
 * @param  {object} action   权限对象
 * @param  {object} data      权限数据
 */
function update(action,data) {
    return new Promise((resolve, reject) => {
        let new_action = Object.assign(action, data);
        new_action.save((err, data) => {
            if (err) {
                logger.error('更新权限信息出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.update = update;

function remove(action) {
    return new Promise((resolve, reject) => {
        action.remove((err, data) => {
            if (err) {
                logger.error('删除权限信息出错', err);
                reject('删除出错,请重新尝试');
                return;
            }
            resolve();
        });
    });
};

exports.remove = remove;