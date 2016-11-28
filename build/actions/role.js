/**
 * Action - role
 * 角色操作
 */
//加载配置文件
import {API_ROLE,API_ROLE_SYNC,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const ROLE_RECEIVE = 'ROLE_RECEIVE';//获取角色分类
export const ROLE_UPDATE = 'ROLE_UPDATE';//更新角色详情
export const ROLE_CLEAR = 'ROLE_CLEAR'; //清除角色信息

/*
 * action 创建函数
 */
export function roleReceive(data) {
    return {
        type: ROLE_RECEIVE,
        info: data
    }
}
export function roleUpdate(data){
    return {
        type: ROLE_UPDATE,
        info: data
    }
}

export function roleClear() {
    return {
        type: ROLE_CLEAR,
    }
}

export function rolePost() {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ROLE,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(roleReceive(json.body.list));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取角色列表错误,请重试'}));
            });
    }
}

export function roleSyncPost() {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ROLE_SYNC,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'同步角色错误,请重试'}));
            });
    }
}

export function roleDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ROLE+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(roleUpdate(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取角色详情错误,请重试'}));
            });
    }
}

export function roleEditPost(data,callback) {
    let post_data=Object.assign({},data);
    if(post_data._id){
        post_data.id=post_data._id;
        delete post_data._id;
    }
    return function(dispatch) {
        let method=API_TYPE.POST;
        if(post_data.id){
            method=API_TYPE.PUT;
        }
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ROLE,method,post_data)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                    if(callback) callback(json);
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'修改角色出错,请重试'}));
            });
    }
}

export function roleDeletePost(id,callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ROLE+id,API_TYPE.DELETE)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                    if(callback) callback(json);
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'删除角色出错,请重试'}));
            });
    }
}