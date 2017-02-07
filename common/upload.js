'use strict';
const qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = global.CONFIG.qiniu.accessKey;
qiniu.conf.SECRET_KEY = global.CONFIG.qiniu.sercetKey;

exports.getUploadToken=function(userId){
    let key = userId+'-'+new Date().getTime()+'.jpg';
    let putPolicy = new qiniu.rs.PutPolicy(global.CONFIG.qiniu.bucket+':'+key);
    return {
        key:key,
        token:putPolicy.token()
    };
};