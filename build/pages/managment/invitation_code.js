/**
 * Page - invitationCode
 * 邀请码管理页
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';

//加载组件
import Nav from '../../components/nav/';

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

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location //路由信息
    }
}

//封装组件
class InvitationCodePage extends Component {
    componentWillMount() {
        const {
            login, location, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            //检测是否拥有访问权限
            dispatch(authMenuPromise(location.pathname, login.menus));
        }
    }
    render() {
        const {
            login, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
            </div>
        );
    }
}
export default connect(propMap)(InvitationCodePage);