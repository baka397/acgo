/**
 * Action - upload
 * 上传操作
 */
import fetch from 'isomorphic-fetch';
//加载配置文件
import {
    UPLOAD_PATH
} from '../config'; //API配置
//加载配置文件
import {
    API_UPLOAD_TOKEN,
    API_TYPE
} from '../config'; //API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {
    MODAL_TYPE,
    modalShow,
    modalHide
} from './modal';


/*
 * action 创建函数
 */
export function uploadTokenPost(callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_UPLOAD_TOKEN, API_TYPE.GET)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    if (callback) callback(json);
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP, {
                        msg: json.head.msg
                    }));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP, {
                    msg: '获取上传token失败'
                }));
            });
    }
}
export function uploadPost(form, callback) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        var form_data = new FormData(form);
        fetch(UPLOAD_PATH, {
            method: 'POST',
            body: form_data
        }).then(response => response.json()).then(json => {
            dispatch(modalHide(MODAL_TYPE.LOADING));
            if(json.error) {
                dispatch(modalShow(MODAL_TYPE.TIP, {
                    msg: json.error
                }));
            }else{
                if(callback) callback(json);
            }
        }).catch(error => {
            console.log(error);
            dispatch(modalHide(MODAL_TYPE.LOADING));
            dispatch(modalShow(MODAL_TYPE.TIP, {
                msg: '上传失败'
            }));
        });
    }
}