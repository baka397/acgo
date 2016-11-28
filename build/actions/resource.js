/**
 * Action - resource
 * 资源操作
 */
//加载配置文件
import {API_RESOURCE_DETAIL,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const RESOURCE_DETAIL_RECEIVE = 'RESOURCE_DETAIL_RECEIVE';//获取资源详情
export const RESOURCE_DETAIL_CLEAR = 'RESOURCE_DETAIL_CLEAR';//清除资源详情

/*
 * action 创建函数
 */
export function resourceDetailReceive(data) {
    return {
        type: RESOURCE_DETAIL_RECEIVE,
        info: data
    }
}
export function resourceDetailClear() {
    return {
        type: RESOURCE_DETAIL_CLEAR
    }
}

export function resourceDetailPost(id) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_RESOURCE_DETAIL+id,API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(resourceDetailReceive(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取资源详情错误,请重试'}));
            });
    }
}