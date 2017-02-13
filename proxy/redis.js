'use strict';
//Redis初始化

const redisClient = require('../common/redis');
const tool = require('../common/tool');
const searcher = require('../lib/search/');
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
            return new Promise(function(resolve){
                tagSearch.index(tag.name,tag._id,function(){
                    resolve();
                });
            });
        }));
        //加入anime索引到promiseList
        promiseList=promiseList.concat(animeList.map(function(anime){
            return new Promise(function(resolve){
                animeSearch.index(anime.name,anime._id,function(){
                    resolve();
                });
            });
        }));
        if(promiseList.length===0) return tool.nextPromise();
        let totalRound=Math.ceil(promiseList.length/global.CONFIG.maxInitNum);
        let promiseFunc=tool.nextPromise();
        for(let i=0;i<totalRound;i++){
            promiseFunc=promiseFunc.then(function(){
                return Promise.all(promiseList.slice(i*global.CONFIG.maxQuestNum,(i+1)*global.CONFIG.maxQuestNum));
            });
        }
        return promiseFunc;
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
exports.initSearchIndex=initSearchIndex;