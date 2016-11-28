/**
 * Components - nav
 * 导航组件
 */
import React, {PropTypes,Component} from 'react';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置

//封装app组件
class Nav extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.cateSelect !== this.props.cateSelect;
    }
    render() {
        const { navMenus,cateSelect,onNavChange } = this.props;
        let menus=navMenus[cateSelect]?navMenus[cateSelect].menus:[];
        return (
            <div className="app-nav">
                <ul className="app-nav-cate">
                    {
                        navMenus.map((cur_cate,index)=>{
                            return <li key={index}><a onClick={(e)=>{onNavChange(index)}} className={cateSelect===index?'active':''}>{cur_cate.name}</a></li>
                        })
                    }
                </ul>
                <ul className="app-nav-menu">
                    {
                        menus.map((cur_menu,index)=>{
                            return <li key={index}><Link to={BASE_PATH+cur_menu.path} activeClassName="active">{cur_menu.name}</Link></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
//组件限制
Nav.propTypes={
    cateSelect:PropTypes.number.isRequired, //选中的目录分类
    navMenus:PropTypes.array.isRequired, //导航列表
    onNavChange:PropTypes.func.isRequired //导航点击
}
export default Nav;