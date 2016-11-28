/**
 * Components - table menu
 * 目录表格组件
 */
import React, {PropTypes,Component} from 'react';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置
//加载常量
import {POST_TYPE} from '../../../enums/common';

//封装app组件
class TableMenu extends Component {
    render() {
        const {
            tableData
        } = this.props;
        return (
            <table className="table table-normal">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>别名</th>
                        <th>请求类型</th>
                        <th width="400">路径</th>
                        <th width="80">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((cur_item,index)=>{
                        let post_type;
                        switch(cur_item.post_type){
                            case POST_TYPE.GET:
                                post_type='GET';
                                break;
                            case POST_TYPE.POST:
                                post_type='POST';
                                break;
                            case POST_TYPE.PUT:
                                post_type='PUT';
                                break;
                            case POST_TYPE.DELETE:
                                post_type='DELETE';
                                break;
                        }
                        return (
                            <tr key={index}>
                                <td>{cur_item.name}</td>
                                <td>{cur_item.alias}</td>
                                <td>{post_type}</td>
                                <td>{cur_item.path}</td>
                                <td>
                                    <Link title="编辑" className="btn btn-primary" to={'/managment/actionItem/'+cur_item.parent_id+'-'+cur_item._id}><i className="fa fa-pencil"></i></Link>
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
TableMenu.propTypes={
    tableData:PropTypes.array.isRequired //表格数据
}
export default TableMenu;