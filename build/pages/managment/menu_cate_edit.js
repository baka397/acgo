/**
 * Page - MenuCateEdit
 * 目录分类编辑
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

//加载组件
import Nav from '../../components/nav/';
import Modal from '../../components/modal/';

//加载action
import {
    MODAL_TYPE, modalShow, modalHide, modalChange
}
from '../../actions/modal';
import {
    appInfoSet, appInfoClear
}
from '../../actions/common';
import {
    authLoginStatus, authMenuPromise
}
from '../../actions/auth';
import {
    userLoginChange
}
from '../../actions/login';
import {
    menuCateDetailPost,menuCateUpdate,menuCateEditPost,menuCateDeletePost,menuClear
}
from '../../actions/menu';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        modal: state.modal,
        menu: state.menu //目录信息
    }
}

//封装组件
class MenuCateEditPage extends Component {
    componentWillMount() {
        const {
            login, location, params, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            if(params.id){
                dispatch(menuCateDetailPost(params.id));
            }
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        //清除目录数据
        dispatch(menuClear());
    }
    render() {
        const {
            login, menu, modal, dispatch
        } = this.props;
        let action_modal;
        if(modal[MODAL_TYPE.CONFIRM]){ //确认
            action_modal=<Modal type={MODAL_TYPE.CONFIRM} data={modal[MODAL_TYPE.CONFIRM]} onModalBack={() => dispatch(modalHide(MODAL_TYPE.CONFIRM))} onModalSubmit={(type)=>this.handleConfirm(type)} />
        }
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <form className="form form-normal" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-control">
                            <label>名称:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入名称" ref="name" value={menu.cate_detail.name} onChange={()=>this.handleChange()} />
                                <p className="text-tip">目录名称必须2-12位</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>排序:</label>
                            <div className="form-control-content">
                                <input type="number" placeholder="请输入排序" ref="order" value={menu.cate_detail.order} onChange={()=>this.handleChange()} />
                                <p className="text-tip">排序越大越靠后</p>
                            </div>
                        </div>
                        <p className="form-btn">
                            <button type="submit" className="btn btn-primary btn-lg">编辑</button>
                            {menu.cate_detail._id?<button type="button" className="btn btn-danger btn-lg m-l" onClick={()=>this.handleDelete()}>删除</button>:''}
                        </p>
                    </form>
                </div>
                {action_modal}
            </div>
        );
    }
    handleSubmit(e){
        const {
            dispatch,menu
        } = this.props;
        if(e) e.preventDefault();
        dispatch(menuCateEditPost(menu.cate_detail,()=>{
            dispatch(goBack());
        }));
    }
    handleChange(){
        const {
            dispatch
        } = this.props;
        let name=this.refs.name.value;
        let order=this.refs.order.value;
        dispatch(menuCateUpdate({
            name:name,
            order:order
        }));
    }
    handleDelete(){
        const {
            dispatch
        } = this.props;
        dispatch(modalShow(MODAL_TYPE.CONFIRM,{
            type:'delete',
            tip:'是否确认删除该分类,删除后不能恢复'
        }));
    }
    handleConfirm(type){
        const {
            menu,dispatch
        } = this.props;
        dispatch(modalHide(MODAL_TYPE.CONFIRM));
        dispatch(menuCateDeletePost(menu.cate_detail._id,()=>{
            dispatch(goBack());
        }))
    }
}
export default connect(propMap)(MenuCateEditPage);