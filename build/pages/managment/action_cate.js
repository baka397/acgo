/**
 * Page - ActionCate
 * 权限分类
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置

//加载常量
import {TABLE_TYPE} from '../../../enums/table';//API配置

//加载组件
import Nav from '../../components/nav/';
import Table from '../../components/table/';

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
    actionCatePost,actionClear
}
from '../../actions/action';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        action: state.action //权限信息
    }
}

//封装组件
class ActionCatePage extends Component {
    componentWillMount() {
        const {
            login, location, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            //检测是否拥有访问权限
            dispatch(authMenuPromise(location.pathname, login.menus,()=>{
                //获取目录列表
                dispatch(actionCatePost());
            }));
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
            login, action, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <div className="m-t clear">
                        <Link to={BASE_PATH+'/managment/actionCate/'} className="btn btn-primary pull-right">添加权限分类</Link>
                    </div>
                    <Table tableData={action.cates} page={1} type={TABLE_TYPE.ACTION_CATE} pageNum={0} />
                </div>
            </div>
        );
    }
}
export default connect(propMap)(ActionCatePage);