//导入action常量
import {ACTION_CATE_RECEIVE,ACTION_CLEAR,ACTION_CATE_UPDATE,ACTION_RECEIVE,ACTION_UPDATE} from '../actions/action';

//初始化state
const INIT_STATE = {
    cates:[], //分类列表
    cate_detail:{}, //分类详情
    actions:[], //目录列表
    action_detail:{} //目录详情
};

export default function action(state = INIT_STATE, action) {
    switch (action.type) {
        case ACTION_CATE_RECEIVE:
            return Object.assign({},state,{
                cates:action.info
            });
            break;
        case ACTION_CATE_UPDATE:
            let new_cate_detail=Object.assign({},state.cate_detail,action.info);
            return Object.assign({},state,{
                cate_detail:new_cate_detail
            });
            break;
        case ACTION_RECEIVE:
            return Object.assign({},state,{
                actions:action.info
            });
            break;
        case ACTION_UPDATE:
            let new_action_detail=Object.assign({},state.action_detail,action.info);
            return Object.assign({},state,{
                action_detail:new_action_detail
            });
            break;
        case ACTION_CLEAR:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}