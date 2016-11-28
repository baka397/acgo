/**
 * Page - RoleEdit
 * 角色编辑
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

//加载组件
import Nav from '../../components/nav/';
import Modal from '../../components/modal/';
import Select from 'react-select';

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
    roleDetailPost,roleUpdate,roleEditPost,roleDeletePost,roleClear
}
from '../../actions/role';
import {
    menuListPost
}
from '../../actions/menu';
import {
    actionListPost
}
from '../../actions/action';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        modal: state.modal,
        role: state.role //权限信息
    }
}

//封装组件
class RoleEditPage extends Component {
    componentWillMount() {
        const {
            login, location, params, query, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            if(params.id){
                dispatch(roleDetailPost(params.id));
            }
            //转义目录及权限缓存
            Promise.all([menuListPost(),actionListPost()]).then(list=>{
                let menu=list[0].body.list;
                let action=list[1].body.list;
                let menu_object={};
                let action_object={};
                let menu_info=menu.map(cur_menu=>{
                    menu_object[cur_menu._id]=cur_menu.name
                    return {
                        value:cur_menu._id,
                        label:cur_menu.name
                    }
                })
                let action_info=action.map(cur_action=>{
                    action_object[cur_action._id]=cur_action.name
                    return {
                        value:cur_action._id,
                        label:cur_action.name
                    }
                });
                dispatch(appInfoSet({
                    menu:menu_info,
                    menu_object:menu_object,
                    action:action_info,
                    action_object:action_object
                }));
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        //清除角色数据
        dispatch(roleClear());
        dispatch(appInfoClear());
    }
    render() {
        const {
            login, role, modal,common, dispatch
        } = this.props;
        let action_modal;
        if(modal[MODAL_TYPE.CONFIRM]){ //确认
            action_modal=<Modal type={MODAL_TYPE.CONFIRM} data={modal[MODAL_TYPE.CONFIRM]} onModalBack={() => dispatch(modalHide(MODAL_TYPE.CONFIRM))} onModalSubmit={(type)=>this.handleConfirm(type)} />
        }
        let menu_options=common.app_info.menu||[];
        let action_options=common.app_info.action||[];
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <form className="form form-normal" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-control">
                            <label>名称:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入名称" ref="name" value={role.role_detail.name} onChange={()=>this.handleChange()} />
                                <p className="text-tip">目录名称必须2-12位</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>别名:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入别名" ref="alias" value={role.role_detail.alias} onChange={()=>this.handleChange()} />
                                <p className="text-tip">别名必须4-12位</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>目录:</label>
                            <div className="form-control-content">
                                <Select name="post_type" value={role.role_detail.menus?role.role_detail.menus.map(cur_menu=>{
                                    return {
                                        value:cur_menu,
                                        label:common.app_info.menu_object?common.app_info.menu_object[cur_menu]:''
                                    }
                                }):''} options={menu_options} valueKey="value" labelKey="label" onChange={(val)=>this.handleSelectMenu(val)} placeholder="请选择目录,可多选" multi={true} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label>权限:</label>
                            <div className="form-control-content">
                                <Select name="post_type" value={role.role_detail.actions?role.role_detail.actions.map(cur_action=>{
                                    return {
                                        value:cur_action,
                                        label:common.app_info.action_object?common.app_info.action_object[cur_action]:''
                                    }
                                }):''} options={action_options} valueKey="value" labelKey="label" onChange={(val)=>this.handleSelectAction(val)} placeholder="请选择权限,可多选" multi={true} />
                            </div>
                        </div>
                        <p className="form-btn">
                            <button type="submit" className="btn btn-primary btn-lg">编辑</button>
                            {role.role_detail._id?<button type="button" className="btn btn-danger btn-lg m-l" onClick={()=>this.handleDelete()}>删除</button>:''}
                        </p>
                    </form>
                </div>
                {action_modal}
            </div>
        );
    }
    handleSubmit(e){
        const {
            dispatch,role
        } = this.props;
        if(e) e.preventDefault();
        dispatch(roleEditPost(role.role_detail,()=>{
            dispatch(goBack());
        }));
    }
    handleChange(){
        const {
            dispatch
        } = this.props;
        let name=this.refs.name.value;
        let alias=this.refs.alias.value;
        dispatch(roleUpdate({
            name:name,
            alias:alias
        }));
    }
    handleSelectMenu(val){
        const {
            dispatch
        } = this.props;
        console.log(val);
        if(!val){
            dispatch(roleUpdate({
                menus:[]
            }));
            return false;
        }
        let menus=val.map(cur_item=>{
            return cur_item.value;
        });
        dispatch(roleUpdate({
            menus:menus
        }));
    }
    handleSelectAction(val){
        const {
            dispatch
        } = this.props;
        if(!val){
            dispatch(roleUpdate({
                actions:[]
            }));
            return false;
        }
        let actions=val.map(cur_item=>{
            return cur_item.value;
        });
        dispatch(roleUpdate({
            actions:actions
        }));
    }
    handleDelete(){
        const {
            dispatch
        } = this.props;
        dispatch(modalShow(MODAL_TYPE.CONFIRM,{
            type:'delete',
            tip:'是否确认删除该角色,删除后不能恢复'
        }));
    }
    handleConfirm(type){
        const {
            role,dispatch
        } = this.props;
        dispatch(modalHide(MODAL_TYPE.CONFIRM));
        dispatch(roleDeletePost(role.role_detail._id,()=>{
            dispatch(goBack());
        }))
    }
}
export default connect(propMap)(RoleEditPage);