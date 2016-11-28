//导入action常量
import {RESOURCE_DETAIL_RECEIVE,RESOURCE_DETAIL_CLEAR} from '../actions/resource';

//初始化state
const INIT_STATE = {
    detail:{} //resource详情
};

export default function playlist(state = INIT_STATE, action) {
    switch (action.type) {
        case RESOURCE_DETAIL_RECEIVE:
            return Object.assign({},state,{
                detail:action.info
            });
            break;
        case RESOURCE_DETAIL_CLEAR:
            return Object.assign({},state,INIT_STATE);
            break;
        default:
            return state;
    }
}