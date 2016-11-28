/**
 * Page - Code
 * 邀请码
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH,PAGE_NUM} from '../../config';//API配置

//加载常量
import {TABLE_TYPE} from '../../../enums/table';//API配置

//加载组件
import Nav from '../../components/nav/';
import Table from '../../components/table/';
import Page from '../../components/page/';

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
    codePost,codeClear,codeAddPost
}
from '../../actions/code';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
        code: state.code //邀请码信息
    }
}

//封装组件
class CodePage extends Component {
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
                dispatch(codePost(1));
            }));
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        //清除数据
        dispatch(codeClear());
    }
    render() {
        const {
            login, code, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <div className="m-t clear">
                        <button type="button" className="btn btn-primary pull-right" onClick={()=>this.handleAdd()}>添加邀请码</button>
                    </div>
                    <Table tableData={code.codes} page={code.page} type={TABLE_TYPE.CODE} pageNum={0} />
                    <Page type={1} curPage={code.page} total={code.count} pageNum={PAGE_NUM} onPageClick={(page)=>this.handlePageClick(page)} />
                </div>
            </div>
        );
    }
    handleAdd(){
        const {
            dispatch,code
        } = this.props;
        dispatch(codeAddPost(()=>{
            dispatch(codeClear());
            dispatch(codePost(code.page));
        }));
    }
    handlePageClick(page){
        const {
            dispatch,code
        } = this.props;
        if(page===code.page) return false;
        dispatch(codePost(page));
    }
}
export default connect(propMap)(CodePage);