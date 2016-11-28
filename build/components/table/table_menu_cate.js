/**
 * Components - table menu
 * 目录表格组件
 */
import React, {PropTypes,Component} from 'react';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置

//封装app组件
class TableMenuCate extends Component {
    render() {
        const {
            tableData
        } = this.props;
        return (
            <table className="table table-normal">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th width="80">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((cur_item,index)=>{
                        return (
                            <tr key={index}>
                                <td>{cur_item.name}</td>
                                <td>
                                    <Link title="编辑" className="btn btn-primary" to={'/managment/menuCate/'+cur_item._id}><i className="fa fa-pencil"></i></Link>
                                    <Link title="下级目录" className="btn btn-default" to={'/managment/menuList/'+cur_item._id}><i className="fa fa-list"></i></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
//组件限制
TableMenuCate.propTypes={
    tableData:PropTypes.array.isRequired //表格数据
}
export default TableMenuCate;