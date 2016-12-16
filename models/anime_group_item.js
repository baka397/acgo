'use strict';
//动画集合分集列表
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
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
    anime_id: {type:ObjectId, required:[true, '必须选择关联动画']}, //关联动画ID
    type: {type:Number, required:[true, '必须选择集合类型']}, //集合类型
    url: {type:String, required:[true, '必须填写分集地址'], validate: urlValidator}, //分集地址
    episode_no: {type:Number, required:[true, '必须填写分集编号']}, //分集编号
    episode_name: {type:Number, required:[true, '必须填写分集名称'], validate: episodeNameValidator}, //分集名称
    create_at: { type: Date, default: Date.now }
});
AnimeGroupItemSchema.plugin(BaseModel);
AnimeGroupItemSchema.index({create_at: -1});
mongoose.model('AnimeGroupItem', AnimeGroupItemSchema);