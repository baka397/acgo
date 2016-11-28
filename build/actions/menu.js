/**
 * Action - menu
 * 目录操作
 */
//加载配置文件
import {API_MENU_CATE,API_MENU,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const MENU_CATE_RECEIVE = 'MENU_CATE_RECEIVE';//获取目录分类
export const MENU_CATE_UPDATE = 'MENU_CATE_UPDATE';//更新目录分类详情
export const MENU_CLEAR = 'MENU_CLEAR'; //清除目录信息
export const MENU_RECEIVE = 'MENU_RECEIVE';//获取目录
export const MENU_UPDATE = 'MENU_UPDATE';//更新目录详情

/*
 * action 创建函数
 */
export function menuCateReceive(data) {
    return {
        type: MENU_CATE_RECEIVE,
        info: data
    }
}
export function menuReceive(data) {
    return {
        type: MENU_RECEIVE,
        info: data
    }
}
export function menuCateUpdate(data){
    return {
        type: MENU_CATE_UPDATE,
        info: data
    }
}
export function menuUpdate(data){
    return {
        type: MENU_UPDATE,
        info: data
    }
}

export function menuClear() {
    return {
        type: MENU_CLEAR,
    }
}

export function menuCatePost() {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU_CATE,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(menuCateReceive(json.body.list));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取目录分类错误,请重试'}));
            });
    }
}

export function menuPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU,API_TYPE.GET,{
            parent:id
        })
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(menuReceive(json.body.list));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取目录错误,请重试'}));
            });
    }
}

export function menuListPost(){
    return postFetch(API_MENU,API_TYPE.GET);
}

export function menuCateDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU_CATE+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(menuCateUpdate(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取目录分类详情错误,请重试'}));
            });
    }
}

export function menuDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(menuUpdate(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取目录详情错误,请重试'}));
            });
    }
}

export function menuCateEditPost(data,callback) {
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
        postFetch(API_MENU_CATE,method,post_data)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'修改目录分类出错,请重试'}));
            });
    }
}
export function menuEditPost(data,callback) {
    let post_data=Object.assign({},data);
    post_data.parent=post_data.parent_id;
    if(post_data._id){
        post_data.id=data._id;
        delete post_data._id;
    }
    delete post_data.parent_id;
    return function(dispatch) {
        let method=API_TYPE.POST;
        if(post_data.id){
            method=API_TYPE.PUT;
        }
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU,method,post_data)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'修改目录出错,请重试'}));
            });
    }
}

export function menuCateDeletePost(id,callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU_CATE+id,API_TYPE.DELETE)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'删除目录分类出错,请重试'}));
            });
    }
}

export function menuDeletePost(id,callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_MENU+id,API_TYPE.DELETE)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'删除目录出错,请重试'}));
            });
    }
}