'use strict';
/**
 * 用户管理
 */
const express = require('express');
const router = express.Router();
const Anime = require('../../../proxy/').Anime;
const tool = require('../../../common/tool');
const ANIME = require('../../../enums/anime');
const validator = require('validator');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/anime';

router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.name=req.body.name;
    data.alias=req.body.alias;
    data.cover=req.body.cover;
    data.coverClip=req.body.coverClip;
    data.showStatus=req.body.showStatus;
    data.desc=req.body.desc;
    data.tag=req.body.tag;
    data.staff=req.body.staff;
    data.cv=req.body.cv;
    data.editUser=req.user._id;
    Anime.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
})

router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    Anime.search(req.query.keyword,'_id name cover cover_clip show_status public_status',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/audit/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let animeId = req.query.animeId;
    if(!validator.isMongoId(animeId)){
        let err = new Error('请指定正确的动画');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    if(req.query.auditStatus&&!ANIME.auditStatus[req.query.auditStatus]){
        let err = new Error('请指定正确的审核状态');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    let reqData=Object.create(null);
    reqData.anime_id=animeId;
    if(req.query.auditStatus) reqData.audit_status=parseInt(req.query.auditStatus);
    Anime.getAnimeEditList(reqData,'_id audit_status create_at update_at',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/:id',function(req,res,next){
    Anime.getById(req.params.id).then(function(result){
        if(result){
            res.send(tool.buildResJson('获取信息成功',result));
        }else{
            let err = new Error('没有该动画数据');
            err.status=STATUS_CODE.MONGO_ERROR;
            next(err)
        }
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/audit/:id',function(req,res,next){
    Anime.getAnimeEditById(req.params.id).then(function(result){
        if(result){
            res.send(tool.buildResJson('获取信息成功',result));
        }else{
            let err = new Error('没有该动画审核数据');
            err.status=STATUS_CODE.MONGO_ERROR;
            next(err)
        }
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;