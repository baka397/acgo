'use strict';
//标签操作
const Tag = require('../models').Tag;
const searcher = require('../lib/search/');
const tool = require('../common/tool');
const TAG = require('../enums/tag');
let tagSearch = searcher.createSearch('tags');
/**
 * 新增标签
 * @param  {String} data  数据对象
 * @return {Object}       Promise对象
 */
function newAndSave(data){
    let tag = new Tag();
    tag.type = data.type;
    if(!TAG.type[tag.type]){
        return tool.nextPromise(new Error('错误的类型值'))
    }
    tag.name = data.name;
    if(data.alias) tag.alias = data.alias;
    return tag.save().then(function(data){
        return new Promise(function(resolve,reject){
            tagSearch.index(tag.name,data._id,function(){
                resolve(data);
            });
        })
    })
}
/**
 * 根据ID更新标签
 * @param  {String} id   Object ID
 * @param  {Object} data 数据对象
 * @return {Object}      Promise对象
 */
// function updateById(id,data){
//     return getById(id).then(function(tag){
//         if(tag){
//             let saveData={};
//             if(data.alias) saveData.alias = data.alias;
//             Object.assign(tag,saveData);
//             return tag.save();
//         }
//         else throw new Error('没有该数据');
//     })
// }
/**
 * 根据ID获取标签
 * @param  {String} id 主键ID
 * @return {Object}    Promise对象
 */
// function getById(id){
//     return Tag.findOne({_id: id});
// }

/**
 * 根据关键字查询标签
 * @param  {String} keyword  关键字
 * @param  {Number} type     类型
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function search(keyword,type,fields,page,pageSize){
    return new Promise(function(resolve,reject){
        if(!keyword) throw new Error('请输入关键字');
        if(!TAG.type[type]) throw new Error('请输入类型');
        tagSearch.query(keyword).end(function(err,ids){
            if(err) reject(err);
            else resolve(ids);
        })
    }).then(function(ids){
        if(ids.length===0) return tool.nextPromise(null,[0,[]])
        return getList({
            '_id':{
                $in:ids
            },
            'type':type
        },fields,page,pageSize)
    })
}

/**
 * 获取标签列表
 * @param  {Object} query    Query info
 * @param  {String} fields   Query info
 * @param  {Number} page     Page number
 * @param  {Number} pageSize Page Size
 * @return {Object}          Promise对象
 */
function getList(query,fields,page,pageSize){
    return Promise.all([Tag.count(query).exec(),Tag.find(query).select(fields).skip((page-1)*pageSize).limit(pageSize).exec()]);
}
exports.newAndSave = newAndSave;
// exports.updateById = updateById;
// exports.getById = getById;
exports.getList = getList;
exports.search = search;