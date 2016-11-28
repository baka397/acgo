'use strict';
let models = require('../models');
let Log = models.Log;

function newAndSave(data) {
    let log = new Log();
    Object.assign(log, data);
    return new Promise((resolve, reject) => {
        log.save((err, data) => {
            if (err) {
                logger.error('保存日志信息出错', err);
                reject('日志保存出错,请重新尝试');
                return;
            }
            resolve();
        });
    });
}
exports.newAndSave = newAndSave;