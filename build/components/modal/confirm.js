/**
 * Components - modal confirm
 * 弹出窗口确认信息组件
 */
import React, {PropTypes,Component} from 'react';

//导入组件
import Header from './header';
import SubmitFooter from './submit_footer';

//封装app组件
class Confirm extends Component {
    render() {
        const { type,tip,msg,onModalBack,onModalSubmit } = this.props;
        var total=0;
        return (
            <div className="modal modal-action">
                <div className="modal-body">
                    <Header titleText="确认操作" onModalBack={onModalBack} />
                    <div className="modal-body-content">
                        <p>{tip?tip:'是否确认进行此次操作'}?</p>
                    </div>
                    <SubmitFooter submitButtonText="确认" onModalSubmit={()=>onModalSubmit(type,msg)} onModalBack={onModalBack} />
                </div>
                <div className="modal-mask" onClick={onModalBack}></div>
            </div>
        )
    }
}
//组件限制
Confirm.propTypes={
    onModalSubmit:PropTypes.func.isRequired,//提交数据
    onModalBack:PropTypes.func.isRequired,//隐藏/取消
    type:PropTypes.string.isRequired, //类型
    tip:PropTypes.string,
    msg:PropTypes.object //附加数据
}
export default Confirm;