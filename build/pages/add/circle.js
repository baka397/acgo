/**
 * Page - Circle
 * 圈子
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置

//加载组件
import Nav from '../../components/nav/';
import Upload from '../../components/upload/';

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
    uploadTokenPost,uploadPost
}
from '../../actions/upload';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        location: state.route.location, //路由信息
    }
}

//封装组件
class CirclePage extends Component {
    componentWillMount() {
        const {
            login, location, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            //检测是否拥有访问权限
            dispatch(authMenuPromise(location.pathname, login.menus,()=>{
            }));
        }
    }
    componentWillUnmount() {
        const {
            dispatch
        } = this.props;
        dispatch(appInfoClear());
    }
    render() {
        const {
            login, common, dispatch
        } = this.props;
        return (
            <div className="app-main">
                <Nav cateSelect={login.cate_select} navMenus={login.menu_cates} onNavChange={(cate_select)=>dispatch(userLoginChange({cate_select:cate_select}))} />
                <div className="app-content">
                    <Upload token={common.app_info.token} originalImage={common.app_info.original_image} imageCropRatio={1000/500} imageCropResult={common.app_info.crop} onUpload={(form)=>this.handleUpload(form)} onCrop={(crop_data)=>this.handleUploadCrop(crop_data)} onReset={()=>this.handleUploadReset()} />
                </div>
            </div>
        );
    }
    handleUpload(form){
        const {
            dispatch
        } = this.props;
        dispatch(uploadTokenPost((json=>{
            dispatch(appInfoSet({
                token:json.body.token
            }));
            dispatch(uploadPost(form,(json)=>{
                dispatch(appInfoSet({
                    original_image:json.key
                }));
            }));
        })))
    }
    handleUploadCrop(crop_data){
        const {
            dispatch
        } = this.props;
        dispatch(appInfoSet({
            crop:crop_data
        }));
    }
    handleUploadReset(){
        const {
            dispatch
        } = this.props;
        dispatch(appInfoClear());
    }
}
export default connect(propMap)(CirclePage);