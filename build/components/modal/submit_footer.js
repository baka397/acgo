/**
 * Components - modal submit footer
 * 弹出窗口提交组件
 */
import React, {PropTypes,Component} from 'react';

//封装app组件
class ModalTableOpen extends Component {
    render() {
        const { submitButtonText,cancelButtonText,onModalBack,onModalSubmit } = this.props;
        return (
            <div className="modal-body-footer">
                <a className="btn btn-primary btn-md" onClick={onModalSubmit}>{submitButtonText}</a>
                <a className="btn btn-trans btn-md" onClick={onModalBack}>{cancelButtonText?cancelButtonText:'取消'}</a>
            </div>
        )
    }
}
//组件限制
ModalTableOpen.propTypes={
    onModalSubmit:PropTypes.func.isRequired,//回调函数
    onModalBack:PropTypes.func.isRequired,//回调函数
    submitButtonText:PropTypes.string.isRequired,//组件数据
    cancelButtonText:PropTypes.string //组件数据
}
export default ModalTableOpen;