/**
 * Components - page
 * 分页组件
 */
import React, {
    PropTypes, Component
}
from 'react';

//封装app组件
class AppPage extends Component {
    render() {
        const {
            curPage, totalPage
        } = this.props;
        
        let page_list = [];
        let page_start = curPage - 7 > 0 ? curPage - 7 : 1;
        let page_end = page_start + 14 >= totalPage ? totalPage : page_start + 14;
        if(page_start>1){
            page_list.push({
                name:'...',
                value:-1,
                class:'disable'
            });
        }
        if(page_start===page_end){
            page_list.push({
                name:1,
                value:1,
                class:'cur'
            });
        }else{
            for(let i=page_start; i<=page_end;i++){
                page_list.push({
                    name:i,
                    value:i,
                    class:i===curPage?'cur':''
                });
            }
        }
        if(page_end < totalPage){
            page_list.push({
                name:'...',
                value:-1,
                class:'disable'
            });
        }
        return (
            <div className="app-content-page">
                <a className={(curPage-1)<=0?'page-prev disable':'page-prev'} onClick={(e,page)=>this.handlePageClick(e,curPage-1)}><i className="fa fa-chevron-left"></i></a>
                <div className="page-list">
                    {page_list.map((value,index)=><a key={index} className={value.class} onClick={(e,page)=>this.handlePageClick(e,value.value)}>{value.name}</a>)}
                </div>
                <a className={(curPage+1)>totalPage?'page-next disable':'page-next'} onClick={(e,page)=>this.handlePageClick(e,curPage+1)}><i className="fa fa-chevron-right"></i></a>
            </div>
        )
    }
    handlePageClick(e, page) {
        const {
            onPageClick, totalPage
        } = this.props;
        e.preventDefault();
        if (page <= 0 || page > totalPage) return false;
        onPageClick(page);
    }
}
//组件限制
AppPage.propTypes = {
    totalPage: PropTypes.number.isRequired, //总页数
    curPage: PropTypes.number.isRequired, //当前分页
    onPageClick: PropTypes.func.isRequired //分页点击事件
}
export default AppPage;