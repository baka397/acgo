'use strict';
const STATUS_CODE = require('../enums/status_code');

exports.filterReqLog = function(data){
    let result=Object.assign({},data);
    if(result.password) delete result.password;
    if(result.oldPassword) delete result.oldPassword;
    return JSON.stringify(result);
}

/**
 * 构建成功JSON
 * @param  {String} msg  返回信息
 * @param  {Object} data 返回数据
 * @return {Object}      
 */
exports.buildResJson = function(msg,data){
    let args=Array.prototype.slice.call(arguments, 2);
    let result=Object.create(null);
    result.msg=msg;
    result.code=STATUS_CODE.SUCCESS;
    //计算分页
    if(args.length>0){
        result.data={
            content:data,
            page:args[0],
            pageSize:args[1],
            total:args[2]
        }
    }else{
        result.data=data
    }
    //打印成功返回数据
    LOG.info(JSON.stringify(result));
    return result;
}

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
exports.nextPromise = function(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    })
}

exports.rebuildPageSize = function(req){
    req.query.page = parseInt(req.query.page);
    req.query.pageSize = parseInt(req.query.pageSize);
    if(!req.query.page||req.query.page<0) req.query.page=1;
    if(!req.query.pageSize||req.query.pageSize>CONFIG.maxPageSize) req.query.pageSize=CONFIG.pageSize;
}

/**
 * 获取时间数据
 * @param  {Number} seconds 秒数
 * @return {String}         实际时间
 */
exports.getTimeInfo = function(seconds){
    let timeOutput;
    for (let aMultiples = ['分', '小时'], nMultiple = 0, nApprox = seconds / 60; nApprox > 1; nApprox /= 60, nMultiple++) {
        timeOutput = parseInt(nApprox) + aMultiples[nMultiple];
    }
    return timeOutput;
}