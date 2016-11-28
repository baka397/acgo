/**
 * Components - playlist
 * 播放列表
 */
import React, {PropTypes,Component} from 'react';
//加载组件
import PlaylistItem from './item';

//封装app组件
class Playlist extends Component {
    render() {
        const { list,limit,onClick,onRemove,play } = this.props;
        let list_item=[];
        list.forEach((cur_item,index)=>{
            if((index+1)===limit) return false;
            list_item.push(Object.assign({index:index+1,play:play===cur_item._id},cur_item));
        });
        return (
            <ul className="app-playlist">
                {list_item.map((cur_item,index)=>{
                    return <li key={cur_item._id} className={cur_item.play?'cur':''}><PlaylistItem data={cur_item} onClick={onClick} onRemove={onRemove} /></li>
                })}
            </ul>
        );
    }
}
//组件限制
Playlist.propTypes={
    play:PropTypes.string.isRequired, //播放ID
    list:PropTypes.array.isRequired, //播放列表
    limit:PropTypes.number.isRequired, //限制数量
    onClick:PropTypes.func.isRequired, //点击事件
    onRemove:PropTypes.func.isRequired //删除事件
}
export default Playlist;