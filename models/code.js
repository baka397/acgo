'use strict';
//邀请码
const mongoose  = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
let CodeSchema = new Schema({
    status: {type: Number, required:[true, '必须填写邀请码状态']}, //邀请码状态,0-未使用,1-已使用,-1-已禁用
    use_user: {type: ObjectId }, //邀请码使用用户
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
CodeSchema.plugin(BaseModel);
CodeSchema.index({create_at: -1});
mongoose.model('Code', CodeSchema);