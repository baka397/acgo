'use strict';
const STATUS_CODE = require('../enums/status_code');
const validator = require('validator');

/**
 * 过滤限制数据
 * @param  {Object} data 过滤前数据
 * @return {String}      
 */
exports.filterLimitData = function(data){
    let result=Object.assign({},data);
    if(result.password) delete result.password;
    if(result.oldPassword) delete result.oldPassword;
    if(result.email) delete result.email;
    return JSON.stringify(result);
};

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
        };
    }else{
        result.data=data;
    }
    //打印成功返回数据
    global.LOG.info(JSON.stringify(result));
    return result;
};

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
function nextPromise(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    });
}
exports.nextPromise=nextPromise;

exports.rebuildPageSize = function(req){
    req.query.page = parseInt(req.query.page);
    req.query.pageSize = parseInt(req.query.pageSize);
    if(!req.query.page||req.query.page<0) req.query.page=1;
    if(!req.query.pageSize||req.query.pageSize>global.CONFIG.maxPageSize) req.query.pageSize=global.CONFIG.pageSize;
};

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
};

/**
 * 创建Promise分页执行列表
 * @param  {Array}  promiseFuncList Promise函数列表
 * @param  {Number} pageSize        单页个数
 * @return {Object}                 Promise对象
 */
exports.buildPromiseListByPage = function(promiseFuncList,pageSize){  
    if(promiseFuncList.length===0||!pageSize) return nextPromise();
    let resultData=[];
    let roundCount=0;
    let totalRound=Math.ceil(promiseFuncList.length/pageSize);
    let promiseFunc=nextPromise();
    for(let i=0;i<totalRound;i++){
        promiseFunc=promiseFunc.then(function(){
            let promiseList=promiseFuncList.slice(i*pageSize,(i+1)*pageSize).map(function(curFunc){
                return curFunc();
            });
            return Promise.all(promiseList)
            .then(function(result){
                roundCount++;
                resultData=resultData.concat(result);
            });
        });
    }
    return promiseFunc.then(function(){
        return nextPromise(null,[roundCount].concat(resultData));
    });
};

/**
 * 是否为图片地址
 * @param  {String}   name 图片名称
 * @return {Boolean}       
 */
exports.isImageName = function(name){
    if(typeof name!=='string') return false;
    let nameArray=name.split('-');
    if(nameArray.length!==2) return false;
    if(!validator.isMongoId(nameArray[0])) return false;
    if(!validator.matches(nameArray[1],/\d{13}\.jpg/)) return false;
    return true;
};