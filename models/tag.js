'use strict';
//标签
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
let tagNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 20],
        message: '标签名称需要{ARGS[0]}-{ARGS[1]}之间的文字'
    }),
    validate({
        validator: 'matches',
        arguments: [/^[\u4e00-\u9fa5\u0800-\u4e00A-Za-z0-9\.\_\'\,\-\s]+$/],
        message: '标签名称只能为中文,字母,数字,空格或特殊字符(._\',-)'
    })
];
let tagAliasValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: '标签名称需要{ARGS[0]}-{ARGS[1]}之间的文字'
    })
];
let TagSchema = new Schema({
    type: {type: Number, required:[true, '必须填写标签类型']}, //标签类型
    name: {type: String, required:[true, '必须填写标签名称'], unique: true, validate: tagNameValidator}, //标签名称
    alias: {type: String, validate: tagAliasValidator}, //标签别名
    create_at: { type: Date, default: Date.now }
});
TagSchema.plugin(BaseModel);
TagSchema.index({create_at: -1});
mongoose.model('Tag', TagSchema);