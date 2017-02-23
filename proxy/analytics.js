'use strict';
//统计操作
const redisProxy = require('./redis');
const tagProxy = require('./tag');
const tool = require('../common/tool');

function getRecommenderTopResult(userId,topNumber){
    return redisProxy.getRecommenderDimension(userId,topNumber)
    .then(function(dimensionResult){
        let ids=[];
        //获取所有tagID
        Object.keys(dimensionResult).forEach(function(key){
            ids=ids.concat(dimensionResult[key].map(function(tag){
                return tag.id;
            }));
        });
        if(ids.length===0) return tool.nextPromise(null,dimensionResult);
        return tagProxy.getList({
            '_id':{
                $in:ids
            }
        },'_id name')
        .then(function(tags){
            let tagObj={};
            let newDimensionResult={};
            tags.forEach(function(tag){
                tagObj[tag._id]=tag.name;
            });
            Object.keys(dimensionResult).forEach(function(key){
                newDimensionResult[key]=dimensionResult[key].map(function(tag){
                    return Object.assign({},tag,{
                        name:tagObj[tag.id]
                    });
                });
            });
            return tool.nextPromise(null,newDimensionResult);
        });
    });
}

exports.getRecommenderTopResult=getRecommenderTopResult;