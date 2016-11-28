/**
 * Components - page
 * 分页组件
 */
import React, {PropTypes,Component} from 'react';

//导入组件
import AppPage from './app_page';

//封装app组件
class Page extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.total !== this.props.total||nextProps.curPage !== this.props.curPage;
    }
    render() {
        const { type,total,curPage,pageNum,onPageClick } = this.props;
        if(pageNum===0) return null;
        let total_page = 0;
        if (total % pageNum > 0) {
            total_page = parseInt(total / pageNum) + 1;
        } else {
            total_page = parseInt(total / pageNum);
        }
        switch(type){
            case 1: //数字分页
            return <AppPage totalPage={total_page} curPage={curPage} onPageClick={onPageClick} />
            break;
            default:
                return null;
        }
    }
}
//组件限制
Page.propTypes={
    type:PropTypes.number.isRequired, //类型,1为数字分页,2为上下翻页
    total:PropTypes.number.isRequired, //总数据量,
    curPage:PropTypes.number.isRequired, //当前分页
    pageNum:PropTypes.number.isRequired, //单页数量
    onPageClick:PropTypes.func.isRequired //分页点击事件
}
export default Page;