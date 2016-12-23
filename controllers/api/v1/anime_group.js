'use strict';
/**
 * 动画合集管理
 */
const express = require('express');
const router = express.Router();
const AnimeGroup = require('../../../proxy/').AnimeGroup;
const tool = require('../../../common/tool');
const validator = require('validator');
const ANIME_GROUP = require('../../../enums/anime_group');
let apiAuth = require('../../../middlewares/api_auth');

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

router.put('/:id',apiAuth.checkApiAdmin,function(req,res,next){
    let data=Object.create(null);
    data.episodeTotal=parseInt(req.body.episodeTotal);
    data.episodeCur=parseInt(req.body.episodeCur);
    data.status=parseInt(req.body.status);
    AnimeGroup.updateById(req.params.id,data).then(function(result){
        res.send(tool.buildResJson('修改成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.post('/task/',apiAuth.checkApiAdmin,function(req,res,next){
    let data=Object.create(null);
    data.groupId=req.body.groupId;
    data.url=req.body.url;
    data.taskPeriod=parseInt(req.body.taskPeriod);
    data.taskStatus=1;
    data.createUser=req.user._id;
    AnimeGroup.newAndSaveTask(data).then(function(result){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/task/',apiAuth.checkApiCrawler,function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let taskPeriod = parseInt(req.query.taskPeriod);
    if(!taskPeriod||!ANIME_GROUP.taskPeriod[taskPeriod]){
        let err = new Error('无效的集合周期');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    let reqData=Object.create(null);
    reqData.task_period=taskPeriod;
    reqData.task_status=1;
    AnimeGroup.getListTask(reqData,'_id group_id url',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/item/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let groupId = req.query.groupId;
    if(!groupId||!validator.isMongoId(groupId)){
        let err = new Error('无效的集合ID');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    let reqData=Object.create(null);
    reqData.group_id=groupId;
    AnimeGroup.getListItem(reqData,'_id episode_name episode_no',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/watch/',function(req,res,next){
    tool.rebuildPageSize(req);
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let reqData=Object.create(null);
    reqData.sub_user=req.user._id;
    AnimeGroup.getListHistory(reqData,'group_id watch_ep update_at',page,pageSize).then(function(result){
        res.send(tool.buildResJson('获取信息成功',result[1],page,pageSize,result[0]));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.get('/:id',function(req,res,next){
    let animeGroupId=req.params.id;
    if(!animeGroupId||!validator.isMongoId(animeGroupId)){
        let err = new Error('请指定正确的ID');
        err.status=STATUS_CODE.ERROR;
        return next(err);
    }
    AnimeGroup.getById(animeGroupId).then(function(result){
        if(result){
            res.send(tool.buildResJson('获取信息成功',result));
        }else{
            let err = new Error('没有该数据');
            err.status=STATUS_CODE.MONGO_ERROR;
            return next(err);
        }
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.put('/task/:id',apiAuth.checkApiAdmin,function(req,res,next){
    let animeGroupTaskId=req.params.id;
    let data=Object.create(null);
    data.taskStatus=parseInt(req.body.taskStatus);
    AnimeGroup.updateTaskById(animeGroupTaskId,data).then(function(result){
        res.send(tool.buildResJson('修改成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.post('/item/',function(req,res,next){
    let data=Object.create(null);
    data.groupId=req.body.groupId;
    data.url=req.body.url;
    data.episodeNo=parseInt(req.body.episodeNo);
    data.episodeName=req.body.episodeName;
    data.createUser=req.user._id;
    AnimeGroup.newAndSaveItem(data).then(function(result){
        res.send(tool.buildResJson('添加成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.put('/item/:id',apiAuth.checkApiAdmin,function(req,res,next){
    let data=Object.create(null);
    data.episodeNo=req.body.episodeNo;
    data.episodeName=req.body.episodeName;
    data.url=req.body.url;
    data.editUser=req.user._id;
    AnimeGroup.updateItemById(req.params.id,data).then(function(result){
        res.send(tool.buildResJson('修改成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

router.post('/watch/',function(req,res,next){
    let data=Object.create(null);
    data.groupId=req.body.groupId;
    data.groupItemId=req.body.groupItemId;
    data.subUser=req.user._id;
    AnimeGroup.addHistory(data).then(function(result){
        res.send(tool.buildResJson('修改成功',null));
    }).catch(function(err){
        err.status=STATUS_CODE.MONGO_ERROR;
        next(err);
    });
});

exports.router = router;