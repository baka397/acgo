'use strict';
let models = require('../models');
let Code = models.Code;
let logger = require('../common/logger');
let config = require('../config');

/**
 * 根据ID查找邀请码
 * @param {Array} object_id 邀请码ID
 */
function getCodeById(object_id,keys) {
    return new Promise((resolve, reject) => {
        Code.findById(object_id,keys, (err, data) => {
            if (err) {
                logger.error('查询邀请码出错', err);
                reject('错误的邀请码id,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};
exports.getCodeById = getCodeById;

function getCodes(param,keys,skip_page) {
    return new Promise((resolve, reject) => {
        let query=Code.find(param).sort('-_id');
        if(keys){
            query.select(keys);
        }
        if(skip_page){
            query.skip(skip_page*config.page_num);
        }
        query.limit(config.page_num);
        query.exec((err, data) => {
            if (err) {
                logger.error('查询邀请码列表出错', err);
                reject('错误的邀请码查询条件,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
}
exports.getCodes = getCodes;

function getCodesCount(param) {
    return new Promise((resolve, reject) => {
        let query=Code.find(param).count((err, count) => {
            if (err) {
                logger.error('查询邀请码数量出错', err);
                reject('错误的邀请码查询条件,请重新尝试');
                return;
            }
            resolve(count);
        });
    });
}
exports.getCodesCount = getCodesCount;

/**
 * 增加邀请码
 * @param  {object} data 邀请码数据
 */
function newAndSave(data) {
    let code = Object.assign(new Code(), data);
    return new Promise((resolve, reject) => {
        code.save((err, data) => {
            if (err) {
                logger.error('保存邀请码出错', err);
                reject('保存出错,请重新尝试');
                return;
            }
            resolve(data);
        });
    });
};

exports.newAndSave = newAndSave;