'use strict';
//动画观看记录
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let AnimeGroupHistorySchema = new Schema({
    group_id: {type: ObjectId, required:[true, '必须选择动画集合']},
    sub_user: {type: ObjectId, required:[true, '必须选择订阅用户']},
    watch_ep: {type: Number, required:[true, '必须填写动画观看分集数'], min: [1, '错误的分集数']},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeGroupHistorySchema.plugin(BaseModel);
AnimeGroupHistorySchema.index({group_id:1,sub_user:1});
mongoose.model('AnimeGroupHistory',AnimeGroupHistorySchema);