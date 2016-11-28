/**
 * Components - modal header
 * 弹出窗口头部组件
 */
import React, {PropTypes,Component} from 'react';

//封装app组件
class ModalHeader extends Component {
    render() {
        const { titleText } = this.props;
        return (
            <div className="modal-body-title"><a className="pull-right" onClick={(e)=>this.handleClick(e)}><i className="fa fa-times" /></a>{titleText}</div>
        )
    }
    handleClick(e){
        e.preventDefault();
        this.props.onModalBack();
    }
}
//组件限制
ModalHeader.propTypes={
    onModalBack:PropTypes.func.isRequired,//回调函数
    titleText:PropTypes.string.isRequired//组件数据
}
export default ModalHeader;