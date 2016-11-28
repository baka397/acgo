/**
 * Page - login
 * 登录页
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';

//加载组件
import Login from '../components/login/';

//加载action
import { userLoginPost,userMePost } from '../actions/login';
import {
    MODAL_TYPE, modalShow, modalHide, modalChange
}
from '../actions/modal';
import {
    appInfoSet, appInfoClear
}
from '../actions/common';

//载入工具
import {decryptPassword} from '../tools/value';

//加载reducer Map
function propMap(state){
    return {
        common: state.common //通用信息
    }
}

//封装组件
class LoginPage extends Component {
    componentWillMount(){
        const { dispatch } = this.props;
        if(localStorage.getItem('api_token')){
            dispatch(userMePost());
        }
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(appInfoClear());
    }
    render() {
        const { common } = this.props;
        return (
            <div className="app-login">
                <div className="app-logo"></div>
                <Login password={common.app_info.password} onLoginSubmit={ (err,data) =>this.handleLoginSubmit(err,data)} onChangePassword={(password)=>this.handleChangePassword(password)} />
            </div>
        );
    }
    handleLoginSubmit(err,data){
        const { dispatch } = this.props;
        if(err){
            dispatch(modalShow(MODAL_TYPE.TIP,err));
            return false;
        }
        dispatch(userLoginPost(data));
    }
    handleChangePassword(password){
        const { dispatch,common } = this.props;
        dispatch(appInfoSet({
            password:decryptPassword(common.app_info.password,password)
        }));
    }
}
export default connect(propMap)(LoginPage);