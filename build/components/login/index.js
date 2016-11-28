/**
 * Components - login
 * 登录组件
 */
import React, {PropTypes,Component} from 'react';
import { Link } from 'react-router';
import validator from 'validator';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置

//加载工具
import {encryptPassword} from '../../tools/value';

//封装app组件
class Login extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.password !== this.props.password;
    }
    render() {
        const { password } = this.props;
        return (
            <form className="form form-login" onSubmit={e => this.handleSubmit(e)} ref="form">
                <div className="form-control">
                    <label>邮箱:</label>
                    <div className="form-control-content"><input type="text" placeholder="请输入邮箱" ref="email" /></div>
                </div>
                <div className="form-control">
                    <label>密码:</label>
                    <div className="form-control-content"><input type="text" ref="password" placeholder="请输入密码" value={encryptPassword(password)} onChange={()=>this.handlePasswordChange()} /></div>
                </div>
                <p className="form-btn"><button type="submit" className="btn btn-primary btn-lg btn-block">立即登录</button></p>
                <p className="text-center m-t"><Link to={BASE_PATH+'/password/'} className="m-r">找回密码</Link> <Link to={BASE_PATH+'/register/'}>使用邀请码注册</Link></p>
            </form>
        );
    }
    handleSubmit(e) {//控制提交
        const { password } = this.props;
        if(e) e.preventDefault();
        let error;
        let data={
            email:this.refs.email.value,
            password:password
        };
        if(!validator.isEmail(data.email)){
            error={
                msg:'请输入正确的邮箱格式'
            }
        }else if(!validator.isLength(data.password,{
            min:6,
            max:32
        })){
            error={
                msg:'密码必须6-32位'
            }
        }
        this.props.onLoginSubmit(error,data);
    }
    handlePasswordChange(){
        this.props.onChangePassword(this.refs.password.value);
    }
}
//组件限制
Login.propTypes={
    password:PropTypes.string, //密码
    onLoginSubmit:PropTypes.func.isRequired, //登录信息提交
    onChangePassword:PropTypes.func.isRequired //变更密码
}
export default Login;