'use strict';
//动画编辑
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let animeNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '动画名称需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
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
    alias: {type: String, required:[true, '必须填写动画别名'], validate: animeAliasValidator}, //动画别名
    cover: {type: String, required:[true, '必须填写动画封面'], validate: animeCoverValidator}, //动画封面
    cover_clip: {type:Array, required:[true, '必须填写封面裁剪比例']}, //封面裁剪比例为数组[x,y,clip_width,clip_height]
    show_status:{type: Number, required:[true, '必须选择动画放映状态']},
    desc: {type: String, required:[true, '必须填写动画简介'], validate: animeDescValidator}, //动画简介
    tag: {type: Array, required:[true,'必须填写动画标签']}, //动画标签
    staff: {type: Array, required:[true,'必须填写动画制作人员']}, //动画制作人员
    cv: {type: Array, required:[true,'必须填写动画声优']}, //动画声优
    status:{type: Number, required:[true, '必须选择动画状态']}, //动画状态,0-未审核, 1-审核通过, -1-审核拒绝
    anime_id: {type: ObjectId},
    edit_user: {type: ObjectId},
    audit_user: {type: ObjectId},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeEditSchema.plugin(BaseModel);
AnimeEditSchema.index({create_at: -1});
mongoose.model('AnimeEdit', AnimeEditSchema);