/**
 * Components - table
 * 表格组件
 */
import React, {
    PropTypes,
    Component
} from 'react';

//加载配置文件
import {
    BASE_PATH
} from '../../config'; //API配置
//加载常量
import {
    TABLE_TYPE
} from '../../../enums/table'; //API配置
//加载组件
import TableMenu from './table_menu';
import TableMenuCate from './table_menu_cate';
import TableAction from './table_action';
import TableActionCate from './table_action_cate';
import TableRole from './table_role';
import TableCode from './table_code';

//封装app组件
class Table extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tableData.length !== this.props.tableData.length || nextProps.page !== this.props.page;
    }
    render() {
        const {
            type,
            tableData,
            page,
            pageNum
        } = this.props;
        //计算table数据
        let table_date = [];
        if (pageNum) {
            table_date = tableData.slice((page - 1) * pageNum, page * pageNum);
        } else {
            table_date = tableData;
        }
        switch (type) {
            case TABLE_TYPE.MENU_CATE:
                return <TableMenuCate tableData = {table_date} />
                break;
            case TABLE_TYPE.MENU:
                return <TableMenu tableData = {table_date} />
                break;
            case TABLE_TYPE.ACTION:
                return <TableAction tableData= {table_date} />
                break;
            case TABLE_TYPE.ACTION_CATE:
                return <TableActionCate tableData = {table_date} />
                break;
            case TABLE_TYPE.ROLE:
                return <TableRole tableData={table_date} />
                break;
            case TABLE_TYPE.CODE:
                return <TableCode tableData={table_date} />
                break;
            default:
                return null;
        }
    }
}
//组件限制
Table.propTypes = {
    tableData: PropTypes.array.isRequired, //表格数据
    type: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired, //表格分类
    page: PropTypes.number.isRequired, //表格分页
    pageNum: PropTypes.number.isRequired //分页数
}
export default Table;