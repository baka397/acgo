//导入action常量
import {CODE_RECEIVE,CODE_CLEAR} from '../actions/code';

//初始化state
const INIT_STATE = {
    codes:[], //优惠券列表
    page:1, //优惠券分页
    count:0 //优惠券总数
};

export default function role(state = INIT_STATE, action) {
    switch (action.type) {
        case CODE_RECEIVE:
            return Object.assign({},state,{
                codes:action.info,
                page:action.page,
                count:action.count
            });
            break;
        case CODE_CLEAR:
            return Object.assign({},INIT_STATE);
            break;
        default:
            return state;
    }
}