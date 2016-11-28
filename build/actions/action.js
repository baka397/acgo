/**
 * Action - action
 * 权限操作
 */
//加载配置文件
import {API_ACTION_CATE,API_ACTION,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const ACTION_CATE_RECEIVE = 'ACTION_CATE_RECEIVE';//获取权限分类
export const ACTION_CATE_UPDATE = 'ACTION_CATE_UPDATE';//更新权限分类详情
export const ACTION_CLEAR = 'ACTION_CLEAR'; //清除权限信息
export const ACTION_RECEIVE = 'ACTION_RECEIVE';//获取权限
export const ACTION_UPDATE = 'ACTION_UPDATE';//更新权限详情

/*
 * action 创建函数
 */
export function actionCateReceive(data) {
    return {
        type: ACTION_CATE_RECEIVE,
        info: data
    }
}
export function actionReceive(data) {
    return {
        type: ACTION_RECEIVE,
        info: data
    }
}
export function actionCateUpdate(data){
    return {
        type: ACTION_CATE_UPDATE,
        info: data
    }
}
export function actionUpdate(data){
    return {
        type: ACTION_UPDATE,
        info: data
    }
}

export function actionClear() {
    return {
        type: ACTION_CLEAR,
    }
}

export function actionCatePost() {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION_CATE,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(actionCateReceive(json.body.list));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取权限分类错误,请重试'}));
            });
    }
}

export function actionPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION,API_TYPE.GET,{
            parent:id
        })
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(actionReceive(json.body.list));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取权限错误,请重试'}));
            });
    }
}

export function actionListPost(){
    return postFetch(API_ACTION,API_TYPE.GET);
}

export function actionCateDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION_CATE+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(actionCateUpdate(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取权限分类详情错误,请重试'}));
            });
    }
}

export function actionDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(actionUpdate(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取权限详情错误,请重试'}));
            });
    }
}

export function actionCateEditPost(data,callback) {
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
        postFetch(API_ACTION_CATE,method,post_data)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'修改权限分类出错,请重试'}));
            });
    }
}

export function actionEditPost(data,callback) {
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
        postFetch(API_ACTION,method,post_data)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'修改权限出错,请重试'}));
            });
    }
}

export function actionCateDeletePost(id,callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION_CATE+id,API_TYPE.DELETE)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'删除权限分类出错,请重试'}));
            });
    }
}

export function actionDeletePost(id,callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_ACTION+id,API_TYPE.DELETE)
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
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'删除权限出错,请重试'}));
            });
    }
}