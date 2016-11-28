'use strict';
let models = require('../models');
let Menu = models.Menu;
let logger = require('../common/logger');

/**
 * 根据ID查找目录
 * @param {Array} object_id 目录ID
 */
function getMenuById(object_id,keys) {
    return new Promise((resolve, reject) => {
        Menu.findById(object_id, keys, (err, data) => {
            if (err) {
                logger.error('查询目录出错', err);
                reject('错误的目录id,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};
exports.getMenuById = getMenuById;

//根据ID串查找所有ID
function getMenuByIds(ids,keys) {
    return new Promise((resolve, reject) => {
        let query = Menu.find().where('_id').in(ids).sort('order');
        if(keys){
            query.select(keys);
        }
        query.exec((err, data) => {
            if (err) {
                logger.error('查询多目录出错', err);
                reject('错误的目录ID列表,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};
exports.getMenuByIds = getMenuByIds;

function getMenus(param,keys) {
    return new Promise((resolve, reject) => {
        let query=Menu.find(param).sort('order');
        if(keys){
            query.select(keys);
        }
        query.exec((err, data) => {
            if (err) {
                logger.error('查询目录列表出错', err);
                reject('错误的目录查询条件,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
}
exports.getMenus = getMenus;

function getMenusCount(param) {
    return new Promise((resolve, reject) => {
        let query=Menu.find(param).count((err, count) => {
            if (err) {
                logger.error('查询目录数量出错', err);
                reject('错误的目录查询条件,请重新尝试');
                return;
            }
            resolve(count);
        });
    });
}
exports.getMenusCount = getMenusCount;

/**
 * 增加目录
 * @param  {object} data 目录数据
 */
function newAndSave(data) {
    let menu = Object.assign(new Menu(), data);
    return new Promise((resolve, reject) => {
        menu.save((err, data) => {
            if (err) {
                logger.error('保存目录出错', err);
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
 * @param  {object} menu    目录对象
 * @param  {object} data      目录数据
 */
function update(menu,data) {
    return new Promise((resolve, reject) => {
        let new_menu = Object.assign(menu, data);
        new_menu.save((err, data) => {
            if (err) {
                logger.error('更新目录信息出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.update = update;

function remove(menu) {
    return new Promise((resolve, reject) => {
        menu.remove((err, data) => {
            if (err) {
                logger.error('删除目录信息出错', err);
                reject('删除出错,请重新尝试');
                return;
            }
            resolve();
        });
    });
};

exports.remove = remove;