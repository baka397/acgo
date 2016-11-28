/**
 * Components - upload
 * 上传组件
 */
import React, {
    PropTypes,
    Component
} from 'react';

//加载配置文件
import {
    getImgUrl
} from '../../tools/image'; //API配置

//加载组件
import Cropper from 'react-cropper';

//封装app组件
class Upload extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.token !== this.props.token || nextProps.originalImage !== this.props.originalImage || (!this.props.imageCropResult&&nextProps.imageCropResult)
    }
    render() {
        const {
            token,originalImage,imageCropRatio,imageCropResult
        } = this.props;
        let cropper;
        if(!imageCropResult&&originalImage){
            cropper=<div className="upload-cropper">
                    <p className="m-b"><button className="btn btn-info" onClick={(e)=>{this.handleCrop(e)}} type="button">确认裁剪</button></p>
                    <Cropper ref="cropper" viewMode={1} src={getImgUrl(originalImage)}
                        style={{height: 400}}
                        aspectRatio={imageCropRatio} />
                </div>
        }else if(imageCropResult){
            cropper=<div className="upload-result">
                <p className="m-b"><button className="btn btn-danger" onClick={(e)=>{this.handleReset(e)}} type="button">重新上传</button></p>
                <img src={getImgUrl(originalImage,imageCropResult)} />
            </div>
        }
        return (
            <div className="upload">
                <form className={originalImage?'upload-form hide':'upload-form'} method="post" encType="multipart/form-data" ref="upload_form">
                  <input name="token" type="hidden" value={token} />
                  <input className="hide" ref="file" name="file" type="file" accept="image/*" onChange={(e)=>this.handleSubmit(e)} />
                  <p><button type="button" className="btn btn-info" onClick={(e)=>this.handleChangePic()}>选择图片</button></p>
                </form>
                {cropper}
            </div>
        )
    }
    handleSubmit(e){
        const {
            onUpload
        } = this.props;
        e.preventDefault();
        if(!this.refs.file.value) return false;
        onUpload(this.refs.upload_form);
    }
    handleCrop(e){
        const {
            onCrop
        } = this.props;
        let cropper_data=this.refs.cropper.getData()
        onCrop([cropper_data.width,cropper_data.height,cropper_data.x,cropper_data.y]);
    }
    handleChangePic(){
        let event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);
        this.refs.file.dispatchEvent(event);
    }
    handleReset(e){
        const {
            onReset
        } = this.props;
        this.refs.file.value='';
        onReset();
        this.handleChangePic();
    }
}
//组件限制
Upload.propTypes = {
    token:PropTypes.string, //授权key
    originalImage:PropTypes.string, //原图
    imageCropRatio:PropTypes.number.isRequired,//裁剪比例
    imageCropResult:PropTypes.array, //裁剪结果
    onUpload:PropTypes.func.isRequired, //提交
    onCrop:PropTypes.func.isRequired, //提交
    onReset:PropTypes.func.isRequired //恢复
}
export default Upload;