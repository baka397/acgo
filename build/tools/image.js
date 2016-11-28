/**
 * Tool - image
 * 图像处理方法
 */
import {
    IMAGE_PATH
} from '../config'; //API配置
/**
 * 解析图片URL
 * @param  {string} key   图片key
 * @param  {Array} crop_info   图片裁剪信息
 * @param  {object} width 图片缩略图宽度
 * @return {string}       图片地址
 */
export function getImgUrl(key,crop_info,width=200){
    if(!crop_info){
        return IMAGE_PATH+key;
    }
    return IMAGE_PATH+key+'?imageMogr2/auto-orient/crop/!'+crop_info[0]+'x'+crop_info[1]+'a'+crop_info[2]+'a'+crop_info[3]+'/thumbnail/'+width+'x';
}