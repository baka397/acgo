//导入action常量
import {MODAL_SHOW,MODAL_HIDE,MODAL_CHANGE} from '../actions/modal';

//初始化state
const INIT_STATE = {
};

export default function modal(state = INIT_STATE, action) {
    switch (action.type) {
        case MODAL_SHOW:
            var new_state=Object.assign({}, state);
            new_state[action.modal_type]=action.data||{};
            return new_state;
            break;
        case MODAL_HIDE:
            //撤销单类弹窗
            if(action.modal_type){
                var new_state=Object.assign({}, state);
                delete new_state[action.modal_type];
                return new_state;
            }
            else{
                return Object.assign({}, INIT_STATE);
            }
            break;
        case MODAL_CHANGE:
            var new_state=Object.assign({}, state);
            Object.assign(new_state[action.modal_type],action.data);
            return new_state;
            break;
        default:
            return state;
    }
}