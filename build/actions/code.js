/**
 * Action - code
 * 邀请码操作
 */
//加载配置文件
import {API_CODE,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const CODE_RECEIVE = 'CODE_RECEIVE';//获取邀请码分类
export const CODE_CLEAR = 'CODE_CLEAR'; //清除邀请码信息

/*
 * action 创建函数
 */
export function codeReceive(data) {
    return {
        type: CODE_RECEIVE,
        info: data.list,
        page:data.page,
        count:data.count
    }
}

export function codeClear() {
    return {
        type: CODE_CLEAR,
    }
}

export function codePost(page) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_CODE,API_TYPE.GET,{
            page:page
        })
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(codeReceive({
                        list:json.body.list,
                        page:page,
                        count:json.body.count
                    }));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取邀请码列表错误,请重试'}));
            });
    }
}

export function codeAddPost(callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_CODE,API_TYPE.POST)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                    if(callback) callback();
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取邀请码列表错误,请重试'}));
            });
    }
}