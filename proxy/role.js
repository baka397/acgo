'use strict';
let models = require('../models');
let Role = models.Role;
let logger = require('../common/logger');

/**
 * 根据ID查找角色
 * @param {Array} object_id 角色ID
 */
function getRoleById(object_id,keys) {
    return new Promise((resolve, reject) => {
        Role.findById(object_id,keys, (err, data) => {
            if (err) {
                logger.error('查询角色出错', err);
                reject('错误的角色id,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};
exports.getRoleById = getRoleById;

/**
 * 根据别名查找角色
 * @param {Array} alias 角色别名
 */
function getRoleByAlias(alias) {
    return new Promise((resolve, reject) => {
        Role.findOne({
            alias: alias
        }, (err, role) => {
            if (err) {
                logger.error('查询角色出错', err);
                reject('查询角色出错,请重新尝试');
                return;
            }
            resolve(role);
        });
    });
};
exports.getRoleByAlias = getRoleByAlias;

function getRoles(param,keys) {
    return new Promise((resolve, reject) => {
        let query=Role.find(param);
        if(keys){
            query.select(keys);
        }
        query.exec((err, data) => {
            if (err) {
                logger.error('查询角色列表出错', err);
                reject('错误的角色查询条件,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
}
exports.getRoles = getRoles;

function getRolesCount(param) {
    return new Promise((resolve, reject) => {
        let query=Role.find(param).count((err, count) => {
            if (err) {
                logger.error('查询角色数量出错', err);
                reject('错误的角色查询条件,请重新尝试');
                return;
            }
            resolve(count);
        });
    });
}
exports.getRolesCount = getRolesCount;

/**
 * 增加角色
 * @param  {object} data 角色数据
 */
function newAndSave(data) {
    let role = Object.assign(new Role(), data);
    return new Promise((resolve, reject) => {
        role.save((err, data) => {
            if (err) {
                logger.error('保存角色出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.newAndSave = newAndSave;

/**
 * 更新目录
 * @param  {object} role       角色对象
 * @param  {object} data      角色数据
 */
function update(role,data) {
    return new Promise((resolve, reject) => {
        let new_role = Object.assign(role, data);
        new_role.save((err, data) => {
            if (err) {
                logger.error('更新角色信息出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.update = update;

function remove(role) {
    return new Promise((resolve, reject) => {
        role.remove((err, data) => {
            if (err) {
                logger.error('删除角色信息出错', err);
                reject('删除出错,请重新尝试');
                return;
            }
            resolve();
        });
    });
};

exports.remove = remove;