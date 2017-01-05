'use strict';
//动画集合分集列表
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
let episodeNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '分集名称需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let AnimeGroupItemSchema = new Schema({
    group_id: {type:ObjectId, required:[true, '必须选择关联集合']}, //集合ID
    url: {type:String, required:[true, '必须填写分集地址'], unique: true, validate: urlValidator}, //分集地址
    episode_no: {type:Number, required:[true, '必须填写分集编号'], min: [1, '错误的分集编号']}, //分集编号
    episode_name: {type:String, required:[true, '必须填写分集名称'], validate: episodeNameValidator}, //分集名称
    create_user:{type:ObjectId,  required:[true, '必须关联添加用户']}, //添加用户
    edit_user:{type:ObjectId}, //编辑用户
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeGroupItemSchema.plugin(BaseModel);
AnimeGroupItemSchema.index({group_id:1,episode_no:1});
mongoose.model('AnimeGroupItem', AnimeGroupItemSchema);