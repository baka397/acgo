'use strict';
let validator = require('validator');
let CodeProxy = require('../../proxy').Code;
//载入工具
let tool = require('../../common/tool');

//添加
exports.addCode = function(req, res, next) {
    let create_by=req.user?req.user._id:'';
    CodeProxy.newAndSave({
        create_by:create_by
    }).then(() => {
        res.send(tool.rebuildResJson('添加邀请码成功'));
    }).catch((err) => {
        next({
            status: 101,
            msg: err
        });
    })
}

exports.getCodes = function(req, res, next) {
    let page = req.query.page?parseInt(req.query.page):1;
    Promise.all([CodeProxy.getCodes({},'_id create_by used_by create_at update_at status',page-1),CodeProxy.getCodesCount({})]).then((results)=>{
        res.send(tool.rebuildResJson('查询邀请码成功',{
            count:results[1],
            list:results[0]
        }));
    }).catch((err)=>{
        next({
            status:101,
            msg:err
        });
    })
}