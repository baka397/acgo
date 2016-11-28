'use strict';
let tool = require('../../common/tool');
let store = require('../../common/store');

exports.getUpToken = function(req, res, next){
    if(store){
        let token = store.token();
        res.header("Cache-Control", "max-age=0, private, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 60*1000);
        if (token) {
            res.send(tool.rebuildResJson('获取授权成功',{
                token
            }));
        }
        else{
            next({
                status: 101,
                msg: '获取授权错误'
            });
        }
    }
    else{
        next({
            status: 500,
            msg: '没有设置上传信息'
        });
    }
}