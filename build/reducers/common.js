//导入action常量
import {
    INIT_APPINFO, INIT_APPINFO_CLEAR
}
from '../actions/common';

//初始化state
const INIT_STATE = {
    app_info: {} //app布局信息
};

export default function common(state = INIT_STATE, action) {
    switch (action.type) {
        case INIT_APPINFO:
            var app_info = Object.assign({}, state.app_info,action.info);
            return Object.assign({}, state, {
                app_info: app_info
            });
            break;
        case INIT_APPINFO_CLEAR:
            if(action.key){
                var app_info = Object.assign({}, state.app_info);
                delete app_info[action.key];
                return Object.assign({}, state, {
                    app_info: app_info
                });
            }else{
                return Object.assign({}, state, {
                    app_info: {}
                });
            }
            break;
        default:
            return state;
    }
}