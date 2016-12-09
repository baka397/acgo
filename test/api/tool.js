'use strict';
const STATUS_CODE = require('../../enums/status_code');
const authTool = require('../../common/auth');
exports.getTokenParams=function(appId,appAlias){
    let timestamp=new Date().getTime()
    return {
        'x-req-token':authTool.md5Hash(appId+timestamp),
        'x-req-timestamp':timestamp,
        'x-req-project':appAlias
    }
}

exports.getPassword=function(string){
    return authTool.md5Hash(string);
}

exports.apiTokenError=function(res){
    if(res.body.code===STATUS_CODE.FORBIDDEN) throw new Error('授权错误');
}