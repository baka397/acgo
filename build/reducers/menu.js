//导入action常量
import {MENU_CATE_RECEIVE,MENU_CLEAR,MENU_CATE_UPDATE,MENU_RECEIVE,MENU_UPDATE} from '../actions/menu';

//初始化state
const INIT_STATE = {
    cates:[], //分类列表
    cate_detail:{}, //分类详情
    menus:[], //目录列表
    menu_detail:{} //目录详情
};

export default function menu(state = INIT_STATE, action) {
    switch (action.type) {
        case MENU_CATE_RECEIVE:
            return Object.assign({},state,{
                cates:action.info
            });
            break;
        case MENU_CATE_UPDATE:
            let new_cate_detail=Object.assign({},state.cate_detail,action.info);
            return Object.assign({},state,{
                cate_detail:new_cate_detail
            });
            break;
        case MENU_RECEIVE:
            return Object.assign({},state,{
                menus:action.info
            });
            break;
        case MENU_UPDATE:
            let new_menu_detail=Object.assign({},state.menu_detail,action.info);
            return Object.assign({},state,{
                menu_detail:new_menu_detail
            });
            break;
        case MENU_CLEAR:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}