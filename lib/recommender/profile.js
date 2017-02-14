'use strict';
const orcClient = require('./client');
const profileModule=orcClient.getProfile;

/**
 * 添加Item数据
 * @param  {Array}  pointArray Item分数对象列表:每个对象包含(userId,itemId,point)
 * @return {Object} Promise对象
 */
function addProfile(pointArray){
    return profileModule.update(pointArray);
}

/**
 * 清除Item数据
 * @param  {String} userId 用户ID
 * @param  {String} itemId Item ID
 * @return {Object}        Promise对象
 */
function clearProfile(userId,itemId){
    return profileModule.remove(userId,itemId);
}
exports.add=addProfile;
exports.clear=clearProfile;