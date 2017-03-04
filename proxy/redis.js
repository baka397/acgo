'use strict';
//Redis初始化
const validator = require('validator');
const redisClient = require('../common/redis');
const tool = require('../common/tool');
const searcher = require('../lib/search/');
const recommender = require('../lib/recommender/');
const tagProxy = require('./tag');
const animeProxy = require('./anime');
let animeSearch = searcher.createSearch('animes');
let tagSearch = searcher.createSearch('tags');

/**
 * 初始化搜索引擎数据
 * @return {Object} Promise对象
 */
function initSearchIndex(){
    return removeSearchIndex().then(function(){
        return Promise.all([tagProxy.getList({},'_id name'),animeProxy.getList({},'_id name')]);
    }).then(function(results){
        let tagList=results[0];
        let animeList=results[1];
        let promiseList=[];
        //加入tag索引到promiseList
        promiseList=promiseList.concat(tagList.map(function(tag){
            return function(){
                return new Promise(function(resolve){
                    tagSearch.index(tag.name,tag._id,function(){
                        resolve();
                    });
                });
            };
        }));
        //加入anime索引到promiseList
        promiseList=promiseList.concat(animeList.map(function(anime){
            return function(){
                return new Promise(function(resolve){
                    animeSearch.index(anime.name,anime._id,function(){
                        resolve();
                    });
                });
            };
        }));
        return tool.buildPromiseListByPage(promiseList,global.CONFIG.pageSize);
    });
}
/**
 * 清空搜索引擎数据
 * @return {Object} Promise对象
 */
function removeSearchIndex(){
    return redisClient.keys(global.CONFIG.redisNamespace+':search:*')
    .then(function(data){
        if(data.length>0) return redisClient.del.apply(redisClient,data);
        else return tool.nextPromise(null);
    });
}

/**
 * 初始化推荐引擎数据
 * @return {Object} Promise对象
 */
function initRecommenderIndex(){
    return recommender.clearData()
    .then(function(){
        return Promise.all([animeProxy.getList({'public_status':1},'_id public_status tag cv staff'),animeProxy.getAnimeSubListOnly({'sub_status':1},'anime_id sub_user sub_status')]);
    })
    .then(function(results){
        let animeList=results[0];
        let animeSubList=results[1];
        let promiseList=[];
        //加入anime到索引序列
        promiseList=promiseList.concat(animeList.map(function(anime){
            let pointDatas=[];
            //添加标签数据
            pointDatas=pointDatas.concat(anime.tag.map(function(curId){
                return {
                    type:'dtag',
                    itemId:anime._id,
                    dId:curId,
                    point:global.CONFIG.tagDefaultPoint
                };
            }));
            //添加staff数据
            pointDatas=pointDatas.concat(anime.staff.map(function(curId){
                return {
                    type:'dstaff',
                    itemId:anime._id,
                    dId:curId,
                    point:global.CONFIG.staffDefaultPoint
                };
            }));
            //添加cv数据
            pointDatas=pointDatas.concat(anime.cv.map(function(curId){
                return {
                    type:'dcv',
                    itemId:anime._id,
                    dId:curId,
                    point:global.CONFIG.cvDefaultPoint
                };
            }));
            return function(){
                return recommender.itemTool.add(pointDatas);
            };
        }));
        //加入animeSub到索引序列
        promiseList=promiseList.concat(animeSubList.map(function(animeSub){
            return function(){
                return recommender.profileTool.add([{
                    userId:animeSub.sub_user,
                    itemId:animeSub.anime_id,
                    point:global.CONFIG.subDefaultPoint
                }]);
            };
        }));
        return tool.buildPromiseListByPage(promiseList,global.CONFIG.pageSize);
    });
}

/**
 * 获取用户Item dimension缓存数据
 * @param  {String} userId 用户ID
 * @param  {Number} top    [可选]Top数据,>0倒叙,<0正序
 * @return {Object}        Promise对象
 */
function getRecommenderDimension(userId,top){
    if(!validator.isMongoId(userId)) return tool.nextPromise(new Error('请使用正确的用户ID'));
    return recommender.rankingTool.getDimensionCache(userId,top).then(function(result){
        let tagIds=[];
        Object.keys(result).forEach(function(dimensionGroup){
            tagIds=tagIds.concat(result[dimensionGroup].map(function(dimension){
                return dimension.id;
            }));
        });
        if(tagIds.length===0) return tool.nextPromise(null,result);
        return tagProxy.getList({
            '_id':{
                $in:tagIds
            }
        },'_id name').then(function(tags){
            let tagMap={};
            let newDimensionResult={};
            tags.forEach(function(tag){
                tagMap[tag._id]=tag.name;
            });
            Object.keys(result).forEach(function(dimensionGroup){
                newDimensionResult[dimensionGroup]=result[dimensionGroup].map(function(dimension){
                    return Object.assign({},dimension,{
                        name:tagMap[dimension.id]
                    });
                });
            });
            return tool.nextPromise(null,newDimensionResult);
        });
    });
}
exports.initSearchIndex=initSearchIndex;
exports.initRecommenderIndex=initRecommenderIndex;
exports.getRecommenderDimension=getRecommenderDimension;