/**
 * Components - modal
 * 弹出窗口组件
 */
import React, {PropTypes,Component} from 'react';

//封装app组件
class ModalTip extends Component {
    render() {
        const {msg} = this.props;
        return (
            <div className="modal modal-tip">
                <div className="modal-body">{msg}</div>
                <div className="modal-mask" onClick={e=>this.handleClick(e)}></div>
            </div>
        )
    }
    handleClick(e){
        e.preventDefault();
        this.props.onModalBack();
    }
}
//组件限制
ModalTip.propTypes={
    onModalBack:PropTypes.func.isRequired,//回调函数
    msg:PropTypes.string.isRequired//组件数据
}
export default ModalTip;