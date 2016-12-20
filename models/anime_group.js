'use strict';
//动画集合分集列表
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let AnimeGroupItemSchema = new Schema({
    anime_id: {type:ObjectId, required:[true, '必须选择关联动画']}, //关联动画ID
    type: {type:Number, required:[true, '必须选择集合类型']}, //集合类型
    episode_num: {type:Number, required:[true, '必须填写分集编号']}, //分集总数
    create_user: {type: ObjectId, required:[true, '必须关联创建用户']}, //创建用户
    status: {type:Number, required:[true, '必须填写集合状态']}, //集合状态,1-正常,-1-禁用
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeGroupItemSchema.plugin(BaseModel);
AnimeGroupItemSchema.index({create_at: -1});
mongoose.model('AnimeGroupItem', AnimeGroupItemSchema);