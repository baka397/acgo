//导入action常量
import {ROLE_RECEIVE,ROLE_UPDATE,ROLE_CLEAR} from '../actions/role';

//初始化state
const INIT_STATE = {
    roles:[], //角色列表
    role_detail:{} //角色详情
};

export default function role(state = INIT_STATE, action) {
    switch (action.type) {
        case ROLE_RECEIVE:
            return Object.assign({},state,{
                roles:action.info
            });
            break;
        case ROLE_UPDATE:
            let new_role_detail=Object.assign({},state.role_detail,action.info);
            return Object.assign({},state,{
                role_detail:new_role_detail
            });
            break;
        case ROLE_CLEAR:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}