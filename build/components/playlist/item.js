/**
 * Components - playlist
 * 播放列表
 */
import React, {PropTypes,Component} from 'react';

//封装app组件
class PlaylistItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data._id !== this.props.data._id||nextProps.data.play !== this.props.data.play;
    }
    render() {
        const { data } = this.props;
        return (
            <div className="app-playlist-item" onClick={()=>this.handleClick()}>
                {data.play?<label className="item-play"><span className="item-play-circle"></span><i className="fa fa-play"></i></label>:<label className="item-order">0{data.index}</label>}
                <span className="item-content">{data.circle_name} {data.name}</span>
                <button className="btn btn-trans" onClick={(e)=>this.handleRemove(e)}><i className="fa fa-trash"></i></button>
            </div>
        );
    }
    handleClick(){
        const { data,onClick } = this.props;
        onClick({
            index:data.index,
            _id:data._id
        });
    }
    handleRemove(e){
        const { data,onRemove } = this.props;
        e.stopPropagation();
        onRemove({
            index:data.index,
            _id:data._id
        });
    }
}
//组件限制
PlaylistItem.propTypes={
    data:PropTypes.object.isRequired, //数据
    onClick:PropTypes.func.isRequired, //点击事件
    onRemove:PropTypes.func.isRequired //删除事件
}
export default PlaylistItem;