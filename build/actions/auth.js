/**
 * Action - auth
 * 验证方法
 */
//加载配置文件
import {BASE_PATH} from '../config';//API配置
//加载依赖
import { push } from 'react-router-redux'; //router跳转方法

//导入常量
import { USER_LOGIN_STATUS_IN } from '../actions/login';

/*
 * action 创建函数
 */

/**
 * 检测登录状态
 * @param  {string}   login_status  登录状态
 * @param  {boolen} check_status 须检测的状态,true为检测是否登录(当未登录时,跳转到登录页),false为检测是否未登录(当登录时,跳转到dashboard页)
 */
export function authLoginStatus(login_status,check_status=true){
    return function(dispatch) {
        //检测登录,当未登录时,跳转到登录页
        if(check_status&&login_status!==USER_LOGIN_STATUS_IN){
            dispatch(push(BASE_PATH+'/login/'));
        }
    }
}

/**
 * 检测页面权限
 * @param  {string} location    页面地址
 * @param  {Array} login_menus 权限目录
 */
export function authMenuPromise(location,login_menus,callback){
    let auth_location=location;
    if(BASE_PATH) auth_location=auth_location.replace(BASE_PATH,'');
    return function(dispatch) {
        login_menus.some((valid_location)=>{
            return auth_location===valid_location['path']
        });
        if(!login_menus.some((valid_location)=>{return auth_location===valid_location['path']})){
            dispatch(push(BASE_PATH+'/403/'));
        }else{
            if(callback) callback();
        }
    }
}