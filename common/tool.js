'use strict';
/**
 * 判断当前是否为ajax请求
 * @param req
 * @returns {boolean}
 */
exports.isAjaxRequest = function(req) {
	let requestType = req.headers['X-Requested-With'] || req.headers['x-requested-with'];
    let acceptType = req.headers['Accept'] || req.headers['accept'];
	return {
        result:requestType==='XMLHttpRequest',
        needJson:requestType==='XMLHttpRequest'&&/application\/json/.test(acceptType)
    }
};

/**
 * 追加contextPath
 * @param url   请求地址
 */
exports.appendContextPath = function(url) {
    let fullPath = __CONTEXT_PATH + url;
    if (/\/$/.test(__CONTEXT_PATH) && /^\//.test(url)) { // 判断是否存在两个“/”重叠的情况
        fullPath = __CONTEXT_PATH.replace(/\/$/, '') + url;
    } else if (!/\/$/.test(__CONTEXT_PATH) && !/^\//.test(url)) {
        fullPath = __CONTEXT_PATH + '/' + url;
    }
    return fullPath;
};

/**
 * 根据request对象获得完整请求路径
 * @param req
 * @returns {string}
 */
exports.getFullUrl = function(req) {
    let url = req.originalUrl.split('?')[0];
    return req.protocol + '://' + req.headers.host + url + (_.isEmpty(req.query) ? '' : '?' + queryString.stringify(req.query));
};

/**
 * 根据request对象获得请求域名
 * @param  {object} req request对象
 * @return {string}     域名
 */
exports.getDomain = function(req){
    return req.protocol + '://' + req.headers.host;
}

/**
 * 根据request对象获得请求地址
 * @param  {object} req request对象
 * @return {string}     请求地址
 */
exports.getPath = function(req){
    return req.originalUrl;
}

/**
 * 根据request对象设置分页数量
 * @param  {object} req request对象
 */
exports.setListInfo = function(req){
    req.query.pageNo=parseInt(req.query.pageNo)>0?parseInt(req.query.pageNo):0;
    req.query.pageSize=parseInt(req.query.pageSize)>CONFIG.pageSize?parseInt(req.query.pageSize):CONFIG.pageSize;
    if(req.query.pageSize>CONFIG.maxPageSize) req.query.pageSize = CONFIG.pageSize;
}

/**
 * 格式化日期
 * @param  {string} dateString  日期字符串
 * @param  {string} format      日期格式
 * @return {string}             格式化后的日期
 */
exports.formatDate = function(dateString,format){
    if(!dateString) return '';
    let date=new Date(dateString);
    let year=date.getFullYear();
    let month=(date.getMonth()+1).toString();
    let day=date.getDate().toString();
    let hour=date.getHours().toString();
    let min=date.getMinutes().toString();
    let sec=date.getSeconds().toString();
    if(month.length<2) month='0'+month;
    if(day.length<2) day='0'+day;
    if(min.length<2) min='0'+min;
    if(sec.length<2) sec='0'+sec;
    let return_date=format.replace('YYYY',year);
    return_date=return_date.replace('MM',month);
    return_date=return_date.replace('DD',day);
    return_date=return_date.replace('hh',hour);
    return_date=return_date.replace('mm',min);
    return_date=return_date.replace('ss',sec);
    return return_date;
}

/**
 * 截取字符串内容
 * @param  {string} str    源字符串
 * @param  {number} length 截取长度（中文算1）
 * @return {string}        结果字符串
 */
exports.strIntercept = function(str,length,removeMore){
    if(!length) length=10;
    str=str.replace(/\n/g,'');
    let reg=new RegExp('[\\S]{0,'+length+'}');
    let result=str.match(reg)[0];
    if(str.length>result.length&&!removeMore){
        result+='...';
    }
    return result;
}

/**
 * 格式化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
exports.serialize = function(data){
    let str='';
    for(let key in data){
        str+=key+'='+encodeURIComponent(data[key])+'&';
    }
    str=str.replace(/\&$/,'');
    return str;
}