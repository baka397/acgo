/**
 * Page - resource detail
 * 登录页
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';

//加载action
import {resourceDetailPost} from '../../actions/resource';

//加载工具
import {closeSubWin} from '../../tools/ipc';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        resource: state.resource //资源信息
    }
}

//封装组件
class ResourceDetailPage extends Component {
    componentWillMount() {
        const {
            dispatch,params
        } = this.props;
        dispatch(resourceDetailPost(params.id))
    }
    render() {
        const {
            resource
        } = this.props;
        return (
            <div className="app-resource">
                <header className="app-title clear"><a onClick={()=>this.handleCloseWin()} className="pull-right"><i className="fa fa-close"></i></a>{resource.detail.name}</header>
            </div>
        );
    }
    handleCloseWin(){
        closeSubWin();
    }
}
export default connect(propMap)(ResourceDetailPage);