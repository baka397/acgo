//导入action常量
import {
    USER_LOGIN_RECEIVE, USER_LOGOUT_RECEIVE, USER_LOGIN_CHANGE
}
from '../actions/login';

//初始化state
const INIT_STATE = {
    status:false, //登录状态
    api_token:'', //授权key
    menu_cates:[],//目录分类列表
    menus:[], //目录列表
    cate_select:0 //选中的目录分类
};

export default function login(state = INIT_STATE, action) {
    switch (action.type) {
        case USER_LOGIN_RECEIVE:
            return Object.assign({}, state, action.info);
            break;
        case USER_LOGOUT_RECEIVE:
            return Object.assign({}, INIT_STATE);
            break;
        case USER_LOGIN_CHANGE:
            return Object.assign({}, state, action.info);
            break;
        default:
            return state;
    }
}