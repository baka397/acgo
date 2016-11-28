/**
 * Page - MenuCate
 * 目录分类
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
    menuCatePost,menuClear
}
from '../../actions/menu';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        menu: state.menu //目录信息
    }
}

//封装组件
class MenuCatePage extends Component {
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
                dispatch(menuCatePost());
            }));
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
            login, menu, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <div className="m-t clear">
                        <Link to={BASE_PATH+'/managment/menuCate/'} className="btn btn-primary pull-right">添加目录分类</Link>
                    </div>
                    <Table tableData={menu.cates} page={1} type={TABLE_TYPE.MENU_CATE} pageNum={0} />
                </div>
            </div>
        );
    }
}
export default connect(propMap)(MenuCatePage);