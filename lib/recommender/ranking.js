'use strict';
const orcClient = require('./client');
const rankingModule=orcClient.getRanking;

/**
 * 获取用户Item dimension缓存数据
 * @param  {String} userId 用户ID
 * @param  {Number} top    [可选]Top数据,>0倒叙,<0正序
 * @return {Object}        Promise对象
 */
function getDimensionCache(userId,top){
    return rankingModule.getDimensionCache(userId,top);
}

exports.getDimensionCache=getDimensionCache;