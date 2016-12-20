'use strict';
/**
 * 动画合集管理
 */
const express = require('express');
const router = express.Router();
const AnimeGroup = require('../../../proxy/').AnimeGroup;
const tool = require('../../../common/tool');
const validator = require('validator');

//枚举
const STATUS_CODE = require('../../../enums/status_code');

exports.requestMapping = '/anime-group';
router.post('/',function(req,res,next){
    let data=Object.create(null);
    data.animeId=req.body.animeId;
    data.type=parseInt(req.body.type);
    data.episodeTotal=parseInt(req.body.episodeTotal);
    data.createUser=req.user._id;
    AnimeGroup.newAndSave(data).then(function(result){
        res.send(tool.buildResJson('添加成功',{
            _id:result._id
        }));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let animeId = req.query.animeId;
    if(!animeId||!validator.isMongoId(animeId)){
        let err = new Error('请指定正确的动画');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    let reqData=Object.create(null);
    reqData.anime_id=animeId;
    reqData.status=1;
    AnimeGroup.getList(reqData,'_id anime_id type episode_total episode_cur create_user create_at',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;