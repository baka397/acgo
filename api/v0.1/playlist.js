'use strict';
let validator = require('validator');
//载入工具
let tool = require('../../common/tool');

//获取播放列表数据
exports.getPlaylistMe = function(req,res,next){
    tool.createStaticOutput('./api/static/playlist/me.json').then((data)=>{
        res.send(tool.rebuildResJson('获取播放列表成功',data));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}