'use strict';
//动画订阅记录
const mongoose  = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let AnimeSubSchema = new Schema({
    anime_id: {type: ObjectId, required:[true, '必须选择动画']},
    sub_user: {type: ObjectId, required:[true, '必须选择订阅用户']},
    sub_status: {type: Number, required:[true, '必须选择订阅状态']},//订阅状态,1-已订阅,-1-未订阅
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AnimeSubSchema.plugin(BaseModel);
AnimeSubSchema.index({anime_id:1,sub_user:1,create_at: -1});
mongoose.model('AnimeSub', AnimeSubSchema);