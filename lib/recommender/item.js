'use strict';
const orcClient = require('./client');
const itemModule=orcClient.getItem;

/**
 * 添加Item数据
 * @param  {Array}  pointArray Item分数对象列表:每个对象包含(itemId,dId(dimension ID),point,type)
 * @return {Object} Promise对象
 */
function addItem(pointArray){
    return itemModule.update(pointArray);
}

/**
 * 清除Item数据
 * @param  {String} type   Item类型
 * @param  {String} itemId Item ID
 * @return {Object}        Promise对象
 */
function clearItem(type,itemId){
    return itemModule.clearItem(type,itemId);
}
exports.add=addItem;
exports.clear=clearItem;