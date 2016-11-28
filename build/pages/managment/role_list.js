/**
 * Page - Role
 * 角色
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
    rolePost,roleSyncPost,roleClear
}
from '../../actions/role';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        role: state.role //角色信息
    }
}

//封装组件
class RolePage extends Component {
    componentWillMount() {
        const {
            login, location, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            //检测是否拥有访问权限
            dispatch(authMenuPromise(location.pathname, login.menus,()=>{
                //获取列表
                dispatch(rolePost());
            }));
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        //清除数据
        dispatch(roleClear());
    }
    render() {
        const {
            login, role, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <div className="m-t clear">
                        <button type="button" className="btn btn-danger" onClick={()=>this.handleSync()}>同步角色</button>
                        <Link to={BASE_PATH+'/managment/roleItem/'} className="btn btn-primary pull-right">添加角色</Link>
                    </div>
                    <Table tableData={role.roles} page={1} type={TABLE_TYPE.ROLE} pageNum={0} />
                </div>
            </div>
        );
    }
    handleSync(){
        const {
            dispatch
        } = this.props;
        dispatch(roleSyncPost());
    }
}
export default connect(propMap)(RolePage);