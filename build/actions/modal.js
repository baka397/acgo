/**
 * Action - modal
 * 弹出窗口操作
 */

/*
 * action 类型
 */
//弹窗隐藏与显示
export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';
export const MODAL_CHANGE = 'MODAL_CHANGE';
//类型
export const MODAL_TYPE={
    LOADING:'LOADING', //加载窗口
    TIP:'TIP', //提示信息窗口
    CONFIRM:'CONFIRM' //确认窗口
}
/*
 * action 创建函数
 */
//显示弹窗
export function modalShow(type,data){
    return {
        type:MODAL_SHOW,
        modal_type:type,
        data:data
    }
}

export function modalHide(modal_type){
    return {
        type:MODAL_HIDE,
        modal_type:modal_type
    }
}

export function modalChange(modal_type,data){
    return {
        type:MODAL_CHANGE,
        modal_type:modal_type,
        data:data
    }
}