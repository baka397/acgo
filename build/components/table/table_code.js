/**
 * Components - table menu
 * 目录表格组件
 */
import React, {PropTypes,Component} from 'react';
import { Link } from 'react-router';

//加载配置文件
import {BASE_PATH} from '../../config';//API配置
//加载工具
import {timeTrans} from '../../tools/time';

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
                        <th>邀请码</th>
                        <th>创建人</th>
                        <th>使用人</th>
                        <th>创建时间</th>
                        <th>使用时间</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((cur_item,index)=>{
                        return (
                            <tr key={index}>
                                <td>{cur_item._id}</td>
                                <td>{cur_item.create_by}</td>
                                <td>{cur_item.used_by}</td>
                                <td>{timeTrans(cur_item.create_at).difference}</td>
                                <td>{cur_item.status>0?timeTrans(cur_item.update_at).difference+'使用':'未使用'}</td>
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