/**
 * Page - dashboard
 * 登录页
 */
//加载依赖
import React, { Component } from 'react';
import { connect } from 'react-redux';

//加载工具
import {openSubWin} from '../tools/ipc';

//加载组件
import Playlist from '../components/playlist/';

//加载action
import {
    authLoginStatus
}
from '../actions/auth';
import {
    playlistPost,playlistPlay
}
from '../actions/playlist';

//加载reducer Map
function propMap(state){
    return {
        common: state.common, //通用信息
        login: state.login,
        playlist: state.playlist //播放列表
    }
}

//封装组件
class DashboardPage extends Component {
    componentWillMount() {
        const {
            login, dispatch
        } = this.props;
        //检测是否登录
        dispatch(authLoginStatus(login.status));
        if (login.status) {
            dispatch(playlistPost({
                page:1,
                limit:7
            }));
        }
    }
    render() {
        const { playlist } = this.props;
        let more;
        if(playlist.count>7){
            more=<button className="btn btn-default btn-block">查看{playlist.count-7}条待播放内容</button>
        }
        return (
            <div className="app-dashboard">
                <header className="dashboard-header">
                    <form className="header-search">
                        <input type="text" placeholder="输入圈子名称搜索" />
                    </form>
                    <button className="header-more btn btn-trans"><i className="fa fa-ellipsis-h"></i></button>
                </header>
                <div className="dashboard-playlist">
                    <ul className="tab">
                        <li className="cur">播放列表</li>
                        <li>播放历史</li>
                    </ul>
                    <Playlist list={playlist.list} limit={playlist.count>7?6:7} play={playlist.play} onClick={(data)=>this.handlePlaylistItemClick(data)} onRemove={(data)=>this.handlePlaylistItemRemove(data)} />
                    {more}
                </div>
            </div>
        );
    }
    handlePlaylistItemClick(data){
        const { dispatch,playlist } = this.props;
        if(data._id===playlist.play) return;
        dispatch(playlistPlay(data._id));
        openSubWin('/resource/'+data._id);
    }
    handlePlaylistItemRemove(data){
        console.log(data);
    }
}
export default connect(propMap)(DashboardPage);