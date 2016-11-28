var qiniu = require('qiniu');
var config = require('../config');

//7牛 client
var qnClient = null;
if (config.qn_access && config.qn_access.secretKey !== 'your secret key') {
    qiniu.conf.ACCESS_KEY = config.qn_access.accessKey;
    qiniu.conf.SECRET_KEY = config.qn_access.secretKey;
    qnClient = new qiniu.rs.PutPolicy(config.qn_access.bucket);
}

module.exports = qnClient;