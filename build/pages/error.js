/**
 * Page - table
 * 堂食
 */
//加载配置文件
import {BASE_PATH} from '../config';//API配置
//加载依赖
import React, { Component } from 'react';
import { Link } from 'react-router';

//封装组件
export class Error403 extends Component {
    render() {
        return (
            <div className="app-error">
                <div className="app-error-content text-center app-error-403">
                    <p className="app-error-info">抱歉，你没有权限访问</p>
                    <p><Link to={BASE_PATH+'/'} className="m-t btn btn-primary btn-lg btn-block">返回首页</Link></p>
                </div>
            </div>
        );
    }
}

export class Error404 extends Component {
    render() {
        return (
            <div className="app-error">
                <div className="app-error-content text-center app-error-404">
                    <p className="app-error-info">抱歉，页面未找到。。。</p>
                    <p><Link to={BASE_PATH+'/'} className="m-t btn btn-primary btn-lg btn-block">返回首页</Link></p>
                </div>
            </div>
        );
    }
}