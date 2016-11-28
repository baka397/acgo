'use strict';
let validator = require('validator');
//载入工具
let tool = require('../../common/tool');

//获取播放列表数据
exports.getResourceDetail = function(req,res,next){
    tool.createStaticOutput('./api/static/resource/detail.json').then((data)=>{
        res.send(tool.rebuildResJson('获取资源信息成功',data));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}