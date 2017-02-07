'use strict';
//动画编辑/审核列表
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let animeAliasValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '动画别名需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let animeCoverValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 100],
        message: '动画封面需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let animeDescValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 500],
        message: '动画简介需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let AnimeEditSchema = new Schema({
    alias: {type: String, validate: animeAliasValidator}, //动画别名
    cover: {type: String, validate: animeCoverValidator}, //动画封面
    cover_clip: {type:Array}, //封面裁剪比例为数组[x,y,clip_width,clip_height]
    show_status:{type: Number},
    desc: {type: String, validate: animeDescValidator}, //动画简介
    tag: {type: Array}, //动画标签
    staff: {type: Array}, //动画制作人员
    cv: {type: Array}, //动画声优
    audit_status:{type: Number, required:[true, '必须选择动画状态']}, //动画状态,0-未审核, 1-审核通过, -1-审核拒绝
    anime_id: {type: ObjectId, required:[true, '必须关联动画ID']},
    edit_user: {type: ObjectId, required:[true, '必须关联编辑用户']},
    audit_user: {type: ObjectId},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeEditSchema.plugin(BaseModel);
AnimeEditSchema.index({anime_id:1,create_at: -1});
mongoose.model('AnimeEdit', AnimeEditSchema);