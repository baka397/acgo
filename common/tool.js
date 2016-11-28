'use strict';
const fs = require('fs');
let config = require('../config');
let crypto = require('crypto');
let xss = require('xss');

/**
 * 序列化object
 * @param  {[type]} object [description]
 * @return {[type]}        [description]
 */
exports.serialize = function(object) {
    let string = '';
    for (let key in object) {
        string += key + '=' + encodeURI(object[key]) + '&';
    }
    string = string.replace(/&$/, '');
    return string;
}

/**
 * 防御跨站攻击脚本
 * @param  {string} string 获得的可疑字符串
 * @return {string}        清理后的字符串
 */
exports.xss = function(string) {
    return xss(string);
}

/**
 * 剪切字符串
 * @param  {string} str 目标字符串
 * @param  {number} len 剪切长度
 * @return {string}     剪切后字符串,如果不显示完全,则会在后添加...
 */
exports.subString = function(str, len) {
    //正则表达式
    let reg = new RegExp('^.{0,' + len + '}', 'g');
    let result_string = str.match(reg);
    let return_string = result_string[0];
    if (str.length > return_string.length) {
        return_string += '...';
    }
    return return_string;
}

/**
 * 格式化日期
 * @param  {string} date_string 日期字符串
 * @param  {string} format      日期格式
 * @return {string}             格式化后的日期
 */
exports.formatDate = function(date_string, format) {
    let date = new Date(date_string);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = '0' + month;
    let day = date.getDate().toString();
    if (day.length < 2) day = '0' + day;
    let hour = date.getHours();
    let return_date = format.replace('yyyy', year);
    return_date = return_date.replace('mm', month);
    return_date = return_date.replace('dd', day);
    return return_date;
}

/**
 * 格式化时间格式为时间戳
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
exports.formatTimestamp = function(date) {
    return Date.parse(new Date(date));
}

/**
 * 解析图片URL
 * @param  {object} img   图片对象
 * @param  {object} width 图片缩略图宽度
 * @return {string}       图片地址
 */
exports.getImgUrl = function(img, width) {
    let crop = img.crop.split(',');
    return config.qn_access.domain + img.key + '?imageMogr2/auto-orient/crop/!' + crop[0] + 'x' + crop[1] + 'a' + crop[2] + 'a' + crop[3] + '/thumbnail/' + width + 'x';
}

exports.getClientIp = function(req) {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    return ip.replace(/^[^\d]*(\d+\.\d+\.\d+\.\d+)[^\d]*$/, '$1');
};

exports.rebuildResJson = function(msg, data) {
    return {
        head: {
            status: 200,
            msg: msg
        },
        body: data ? data : {}
    }
}

/**
 * MD5加密密码
 * @param  {string} password 密码
 * @return {string}          加密后的密码
 */
exports.md5password = function(password) {
    let new_password = crypto.createHash('md5')
        .update(password)
        .update(config.password_salt)
        .digest('hex');
    return new_password;
}

/**
 * 获取API token
 * @param  {string} object_id 用户ID
 * @param  {number} update_at 最后更新时间
 * @return {string}           api_token
 */
exports.packApiToken = function(object_id,update_at){
    let api_token = cipher('rc4',config.token_salt,object_id+'|||'+update_at);
    return api_token;
}
exports.unpackApiToken = function(token){
    let object_id = decipher('rc4',config.token_salt,token).split('|||');
    return object_id[0];
}

//加密
function cipher(algorithm, key, buf){
    let encrypted = '';
    let cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
}

//解密
function decipher(algorithm, key, encrypted){
    let decrypted = '';
    let decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

//获取静态输出数据(测试用)
exports.createStaticOutput = function(path){
    return new Promise((resolve, reject)=>{
        fs.stat(path, (err, stats) => {
            if(err){
                reject(err);
                return false;
            }
            fs.readFile(path,(err, data)=>{
                if(err){
                    reject(err);
                    return false;
                }
                resolve(JSON.parse(data));
            });
        });
    })
}