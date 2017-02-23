'use strict';
//关注
const mongoose  = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let UserFollowSchema = new Schema({
    create_user:{type: ObjectId, required:[true, '必须指定创建用户']},
    follow_user:{type: ObjectId, required:[true, '必须指定关注用户']},
    status: {type:Number, required:[true, '必须指定关注状态']}, //关注状态,0-未关注,1-已关注,2-相互关注
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
UserFollowSchema.plugin(BaseModel);
UserFollowSchema.index({create_user:1,follow_user:1,create_at: -1});
mongoose.model('UserFollow', UserFollowSchema);