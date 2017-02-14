'use strict';
const tool = require('../../common/tool');
const orcClient = require('./client');
const itemTool = require('./item');
const profileTool = require('./profile');
const config = require('../../config/');
/**
 * 清空数据
 * @return {Object} Promise对象
 */
function clearData(){
    let redisClient=orcClient.redis;
    return redisClient.keys(config.redisNamespace+':orc:*')
    .then(function(data){
        if(data.length>0) return redisClient.del.apply(redisClient,data);
        else return tool.nextPromise(null);
    });
}
exports.clearData=clearData;
exports.itemTool=itemTool;
exports.profileTool=profileTool;