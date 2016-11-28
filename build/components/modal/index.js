/**
 * Components - modal
 * 弹出窗口组件
 */
import React, {PropTypes,Component} from 'react';
//导入常量
import { MODAL_TYPE } from '../../actions/modal';

//导入组件
import Loading from './loading';
import Tip from './tip';
import Confirm from './confirm';

//封装app组件
class Modal extends Component {
    componentDidMount() {
        const { onModalBack } = this.props;
    }
    render() {
        const { type,data,onModalBack,onModalSubmit,onModalChange } = this.props;
        //检测是否显示app或是否存在该类型
        if(!MODAL_TYPE[type]){
            return null;
        }
        switch(type){
            case MODAL_TYPE.LOADING: //加载窗口
                return (
                    <Loading />
                )
                break;
            case MODAL_TYPE.TIP: //提示信息窗口
                return (
                    <Tip msg={data.msg} onModalBack={onModalBack} />
                )
                break;
            case MODAL_TYPE.CONFIRM:
                return (
                    <Confirm type={data.type} tip={data.tip} msg={data.msg} onModalBack={onModalBack} onModalSubmit={onModalSubmit} />
                )
                break;
            default:
                return null;
        }
    }
}
//组件限制
Modal.propTypes={
    type:PropTypes.string.isRequired, //类型
    data:PropTypes.object, //组件数据
    onModalSubmit:PropTypes.func, //提交数据
    onModalBack:PropTypes.func, //隐藏/取消
    onModalChange:PropTypes.func //数据变更
}
export default Modal;