'use strict';
/**
 * 标签管理
 */
const express = require('express');
const router = express.Router();
const validator = require('validator');
const Tag = require('../../../proxy/').Tag;
const tool = require('../../../common/tool');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/tag';

router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.type=parseInt(req.body.type);
    data.name=req.body.name;
    data.alias=req.body.alias;
    Tag.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',{
            _id:result._id,
            name:result.name
        }));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})
router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let fields='_id name alias type';
    req.query.type=parseInt(req.query.type);
    if(req.query.ids){
        let ids=req.query.ids.split(',');
        let validId=ids.every(function(id){
            return validator.isMongoId(id);
        })
        if(!validId){
            let err = new Error('请指定正确的ID列表');
            err.status=STATUS_CODE.ERROR;
            return next(err);
        }
        let getQuery=Object.create(null);
        getQuery._id={
            $in:ids
        }
        if(parseInt(req.query.type)) getQuery.type=req.query.type;
        Tag.getList(getQuery,fields,page,pageSize).then(function(result){
            res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
        }).catch(function(err){
            err.status=STATUS_CODE.MONGO_ERROR;
            next(err);
        });
    }else{
        Tag.search(req.query.keyword,req.query.type,fields,page,pageSize).then(function(result){
            res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
        }).catch(function(err){
            err.status=STATUS_CODE.MONGO_ERROR;
            next(err);
        });
    }
});

exports.router = router;