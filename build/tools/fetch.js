/**
 * Tool - fetch
 * 请求方法
 */
//加载依赖
import fetch from 'isomorphic-fetch';
/**
 * 发起fetch方法
 * @param {string} url 请求地址
 * @param  {string} method http请求类型,GET/POST/PUT/DELETE
 * @param  {object} data 发送数据
 * @param  {object} send_headers 头部额外发送信息
 * @return {function}      promise对象
 */
export default function postFetch(url,method,data,send_headers){
    let token=localStorage.getItem('api_token');
    let request;
    let headers={
        'Content-Type':'application/json',
        'API-TYPE':client_type,
        'API-TOKEN':token
    };
    if(send_headers){
        headers=Object.assign(headers,send_headers);
    }
    switch(method){
        case 'GET':
        case 'DELETE':
            let url_params='';
            if(data){
                Object.keys(data).forEach((key) => {
                    url_params+='&'+key+'='+data[key];
                });
                if(/\?/.test(url)){
                    url+=url_params;
                }else{
                    url+=url_params.replace(/^\&/,'?');
                }
            }
            request = new Request(url, {
                method: method,
                headers: headers
            });
            break;
        case 'PUT':
        case 'POST':
            request = new Request(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            });
            break;
        default:
            throw new Error('无效的http请求类型');
    }
    return fetch(request).then(response => response.json());
}