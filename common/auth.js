'use strict';
const crypto = require('crypto');

function md5Hash(str){
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex').toUpperCase();
}

/**
 * 验证API token是否有效
 */
exports.validApiToken = function(token,appId,timestamp){
    return token===md5Hash(appId+timestamp);
}

exports.md5Hash = md5Hash;