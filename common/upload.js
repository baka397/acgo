'use strict';
const qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = CONFIG.qiniu.accessKey;
qiniu.conf.SECRET_KEY = CONFIG.qiniu.sercetKey;


exports.getUploadToken=function(userId){
    let key = userId+'-'+new Date().getTime()+'.jpg';
    let putPolicy = new qiniu.rs.PutPolicy(CONFIG.qiniu.bucket+':'+key);
    return putPolicy.token();
}