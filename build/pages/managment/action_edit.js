/**
 * Page - ActionEdit
 * 权限编辑
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
//加载常量
import {POST_TYPE} from '../../../enums/common';

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
    actionDetailPost,actionUpdate,actionEditPost,actionDeletePost,actionClear
}
from '../../actions/action';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        modal: state.modal,
        action: state.action //权限信息
    }
}

//封装组件
class ActionEditPage extends Component {
    componentWillMount() {
        const {
            login, location, params, query, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            dispatch(actionUpdate({
                parent_id:params.parent_id
            }));
            if(params.id){
                dispatch(actionDetailPost(params.id));
            }
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        //清除权限数据
        dispatch(actionClear());
    }
    render() {
        const {
            login, action, modal, dispatch
        } = this.props;
        let action_modal;
        if(modal[MODAL_TYPE.CONFIRM]){ //确认
            action_modal=<Modal type={MODAL_TYPE.CONFIRM} data={modal[MODAL_TYPE.CONFIRM]} onModalBack={() => dispatch(modalHide(MODAL_TYPE.CONFIRM))} onModalSubmit={(type)=>this.handleConfirm(type)} />
        }
        let post_type_options=Object.keys(POST_TYPE).map((cur_type)=>{
            return {
                value:POST_TYPE[cur_type],
                label:cur_type
            }
        });
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <form className="form form-normal" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-control">
                            <label>名称:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入名称" ref="name" value={action.action_detail.name} onChange={()=>this.handleChange()} />
                                <p className="text-tip">目录名称必须2-12位</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>别名:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入别名" ref="alias" value={action.action_detail.alias} onChange={()=>this.handleChange()} readOnly={action.action_detail._id?true:false} />
                                <p className="text-tip">别名必须4-12位</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>路径:</label>
                            <div className="form-control-content">
                                <input type="text" placeholder="请输入目录路径" ref="path" value={action.action_detail.path} onChange={()=>this.handleChange()} />
                                <p className="text-tip">目录路径由/,大小写英文构成,最多两级</p>
                            </div>
                        </div>
                        <div className="form-control">
                            <label>类型:</label>
                            <div className="form-control-content">
                                <Select name="post_type" value={action.action_detail.post_type} options={post_type_options} onChange={(val)=>this.handleSelect(val)} placeholder="请选择路径" searchable={false} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label>排序:</label>
                            <div className="form-control-content">
                                <input type="number" placeholder="请输入排序" ref="order" value={action.action_detail.order} onChange={()=>this.handleChange()} />
                                <p className="text-tip">排序越大越靠后</p>
                            </div>
                        </div>
                        <p className="form-btn">
                            <button type="submit" className="btn btn-primary btn-lg">编辑</button>
                            {action.action_detail._id?<button type="button" className="btn btn-danger btn-lg m-l" onClick={()=>this.handleDelete()}>删除</button>:''}
                        </p>
                    </form>
                </div>
                {action_modal}
            </div>
        );
    }
    handleSubmit(e){
        const {
            dispatch,action
        } = this.props;
        if(e) e.preventDefault();
        dispatch(actionEditPost(action.action_detail,()=>{
            dispatch(goBack());
        }));
    }
    handleChange(){
        const {
            dispatch
        } = this.props;
        let name=this.refs.name.value;
        let alias=this.refs.alias.value;
        let order=this.refs.order.value;
        let path=this.refs.path.value;
        dispatch(actionUpdate({
            name:name,
            alias:alias,
            order:order,
            path:path
        }));
    }
    handleSelect(val){
        const {
            dispatch
        } = this.props;
        dispatch(actionUpdate({
            post_type:val.value
        }));
    }
    handleDelete(){
        const {
            dispatch
        } = this.props;
        dispatch(modalShow(MODAL_TYPE.CONFIRM,{
            type:'delete',
            tip:'是否确认删除该权限,删除后不能恢复'
        }));
    }
    handleConfirm(type){
        const {
            action,dispatch
        } = this.props;
        dispatch(modalHide(MODAL_TYPE.CONFIRM));
        dispatch(actionDeletePost(action.action_detail._id,()=>{
            dispatch(goBack());
        }))
    }
}
export default connect(propMap)(ActionEditPage);