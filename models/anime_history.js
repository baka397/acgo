'use strict';
//动画观看记录
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let AnimeSubSchema = new Schema({
    group_id: {type: ObjectId, required:[true, '必须选择动画集合']},
    sub_user: {type: ObjectId, required:[true, '必须选择订阅用户']},
    anime_group_ep: {type: Number, required:[true, '必须填写动画观看分集数']},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeSubSchema.plugin(BaseModel);
AnimeSubSchema.index({create_at: -1});
mongoose.model('AnimeSub', AnimeSubSchema);