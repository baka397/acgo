'use strict';
//动画集合抓取任务列表
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let urlValidator = [
    validate({
        validator: 'isURL',
        message: '请填写正确的URL'
    })
];
let AnimeGroupTaskSchema = new Schema({
    group_id: {type:ObjectId, required:[true, '必须选择关联集合'], unique: true},
    url: {type:String, required:[true, '必须填写集合抓取地址'], unique: true, validate: urlValidator},
    task_period: {type:String, required:[true, '必须填写集合更新周期']},
    task_status: {type:String, required:[true, '抓取状态']}, //1-正常,0-暂停,-1-停止
    create_user:{type:ObjectId,  required:[true, '请输入添加用户']}, //添加用户
    create_at: { type: Date, default: Date.now }
});
AnimeGroupTaskSchema.plugin(BaseModel);
AnimeGroupTaskSchema.index({group_id:1,create_at: -1});
mongoose.model('AnimeGroupTask', AnimeGroupTaskSchema);