/**
 * Action - playlist
 * 播放列表操作
 */
//加载配置文件
import {API_PLAYLIST_ME,API_TYPE} from '../config';//API配置
//加载依赖
import postFetch from '../tools/fetch';
//载入相关action
import {MODAL_TYPE,modalShow,modalHide} from './modal';

/*
 * action 类型
 */
export const PLAYLIST_RECEIVE = 'PLAYLIST_RECEIVE';//获取播放列表
export const PLAYLIST_PLAY = 'PLAYLIST_PLAY';//获取播放列表

/*
 * action 创建函数
 */
export function playlistReceive(data) {
    return {
        type: PLAYLIST_RECEIVE,
        info: data
    }
}
export function playlistPlay(id) {
    return {
        type: PLAYLIST_PLAY,
        id
    }
}

export function playlistPost(params) {
    return function(dispatch) {
        dispatch(modalShow(MODAL_TYPE.LOADING));
        postFetch(API_PLAYLIST_ME,API_TYPE.GET,params)
            .then(json => {
                dispatch(modalHide(MODAL_TYPE.LOADING));
                if (json.head.status === 200) {
                    //初始化数据
                    dispatch(playlistReceive(json.body));
                } else {
                    dispatch(modalShow(MODAL_TYPE.TIP,{msg:json.head.msg}));
                }
            }).catch(error => {
                console.log(error);
                dispatch(modalHide(MODAL_TYPE.LOADING));
                dispatch(modalShow(MODAL_TYPE.TIP,{msg:'获取播放列表错误,请重试'}));
            });
    }
}