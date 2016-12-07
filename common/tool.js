'use strict';
const STATUS_CODE = require('../enums/status_code');

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
    return result;
}