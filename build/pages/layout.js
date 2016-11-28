/**
 * Page - layout
 * 框架
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';

//加载组件
import Modal from '../components/modal/';

//加载常量
import { MODAL_TYPE,modalHide } from '../actions/modal';

//加载reducer Map
function propMap(state){
    return {
        modal:state.modal//模态信息
    }
}

//封装组件
class Layout extends Component {
    render() {
        const { modal,dispatch } = this.props;
        var modal_loading,modal_tip;
        if(modal[MODAL_TYPE.LOADING]){//检测是否有弹出窗口
            modal_loading=<Modal type={MODAL_TYPE.LOADING} />;
        }
        if(modal[MODAL_TYPE.TIP]){
            modal_tip=<Modal type={MODAL_TYPE.TIP} data={modal[MODAL_TYPE.TIP]} onModalBack={() => dispatch(modalHide(MODAL_TYPE.TIP))} />;
        }
        if(modal[MODAL_TYPE.CONTACT]){
            modal_tip=<Modal type={MODAL_TYPE.CONTACT} data={modal[MODAL_TYPE.CONTACT]} onModalBack={() => dispatch(modalHide(MODAL_TYPE.CONTACT))} />;
        }
        return (
        	<div className="app">
                {modal_loading}
                {modal_tip}
                {this.props.children}
            </div>
        );
    }
}
export default connect(propMap)(Layout);