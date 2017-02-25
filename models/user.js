'use strict';
//标签
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const config = require('../config');
let nickBlockRule = new RegExp('('+config.blockNickName.join('|')+')','i');
let userEmailValidator = [
    validate({
        validator: 'isEmail',
        message: '请输入正确的邮箱'
    })
];
let userNicknameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 10],
        message: '昵称需要{ARGS[0]}-{ARGS[1]}之间的文字'
    }),
    validate({
        validator: 'matches',
        arguments: [/^[^\s\.\-\_\*]+$/],
        message: '错误的用户昵称'
    }),
    {
        validator: function(v) {
            return !nickBlockRule.test(v);
        },
        message: '昵称含有敏感词'
    }
];
let UserSchema = new Schema({
    email: {type: String, required:[true, '必须填写邮箱地址'], unique: true, validate: userEmailValidator}, //邮箱地址
    nickname: {type: String, required:[true, '必须填写昵称'], unique: true, validate: userNicknameValidator}, //昵称
    password: {type: String, required:[true, '必须填写密码']}, //密码
    create_at: { type: Date, default: Date.now }
});
UserSchema.plugin(BaseModel);
UserSchema.index({email:1,create_at: -1});
mongoose.model('User', UserSchema);