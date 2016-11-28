/**
 * Components - modal
 * 弹出窗口组件
 */
import React, {PropTypes,Component} from 'react';

//封装app组件
class ModalLoading extends Component {
    render() {
        return (
            <div className="modal-loading">
                <div className="modal-loading-content">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalLoading;