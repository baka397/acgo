//导入action常量
import {PLAYLIST_RECEIVE,PLAYLIST_PLAY} from '../actions/playlist';

//初始化state
const INIT_STATE = {
    count:0, //播放列表数量
    play:'', //选择的播放ID
    list:[] //播放列表详情
};

export default function playlist(state = INIT_STATE, action) {
    switch (action.type) {
        case PLAYLIST_RECEIVE:
            return Object.assign({},state,{
                count:action.info.count,
                list:action.info.list
            });
            break;
        case PLAYLIST_PLAY:
            return Object.assign({},state,{
                play:action.id
            });
            break;
        default:
            return state;
    }
}