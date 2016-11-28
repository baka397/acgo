/**
 * Action - login
 * 用户登录操作
 */
//加载配置文件
import {BASE_PATH,API_USER_LOGIN,API_USER_ME,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
import {openDashboard} from '../tools/ipc';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';
import {push} from 'react-router-redux';

/*
 * action 类型
 */
export const USER_LOGIN_RECEIVE = 'USER_LOGIN_RECEIVE';//登入请求
export const USER_LOGOUT_RECEIVE = 'USER_LOGOUT_RECEIVE';//登出请求
export const USER_LOGIN_CHANGE = 'USER_LOGIN_CHANGE' //用户登录信息变更
//状态
export const USER_LOGIN_STATUS_OUT = false; //登出
export const USER_LOGIN_STATUS_IN = true; //登入

/*
 * action 创建函数
 */
//登录
export function userLoginReceive(data) {
    return {
        type: USER_LOGIN_RECEIVE,
        info: Object.assign({
            status:USER_LOGIN_STATUS_IN
        },data)
    }
}

export function userLoginChange(data){
    return {
        type: USER_LOGIN_CHANGE,
        info:data
    }
}

export function userLoginPost(data) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_USER_LOGIN,API_TYPE.POST,data)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    localStorage.setItem('api_token', json.body.api_token);
                    initUser(dispatch,json);
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'登录错误,请重试'}));
            });
    }
}

export function userMePost() {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_USER_ME,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    initUser(dispatch,json);
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'初始化用户信息错误,请重新登录'}));
            });
    }
}

function initUser(dispatch,json){
    //计算目录结构
    let menu_cate_list={};
    json.body.menus.forEach(cur_menu=>{
        if(!menu_cate_list[cur_menu.parent_id]){
            menu_cate_list[cur_menu.parent_id]=[cur_menu];
        }else{
            menu_cate_list[cur_menu.parent_id].push(cur_menu);
        }
    });
    let filter_menu_cates=[];
    menu_cates.filter(cur_cate=>{
        if(menu_cate_list[cur_cate['_id']]){
            let cate_info=Object.assign({},cur_cate,{
                menus:menu_cate_list[cur_cate['_id']]
            });
            filter_menu_cates.push(cate_info);
            return true;
        }else{
            return false;
        }
    });
    let user_info=Object.assign({},json.body,{
        menu_cates:filter_menu_cates
    });
    delete user_info.menus;
    //初始化数据
    dispatch(userLoginReceive(user_info));
    //跳转到控制台
    openDashboard();
    dispatch(push(BASE_PATH+'/dashboard/'));
}