'use strict';
//应用分发
const mongoose  = require('mongoose');
const validate = require('mongoose-validator');
const BaseModel = require("./base_model");
const Schema = mongoose.Schema;
let projectNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '应用名称需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let projectAliasValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '应用别名需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: '应用别名只能使用数字或英文'
    })
];
let userNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 5],
        message: '管理员姓名需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    })
];
let userEmailValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '管理员邮箱需要{ARGS[0]}-{ARGS[1]}之间的字符串'
    }),
    validate({
        validator: 'isEmail',
        message: '错误的邮箱格式'
    })
];
let AppSchema = new Schema({
    project_name: {type: String, required:[true, '必须填写应用名称'], unique: true, validate: projectNameValidator}, //应用名称，3-50
    project_alias:{type: String, required:[true, '必须填写应用别名'], unique: true, validate: projectAliasValidator}, //应用别名，英文，3-50
    user_name: {type: String, required:[true, '必须填写管理员姓名'], validate: userNameValidator}, //管理员姓名
    user_email: {type: String, required:[true, '必须填写管理员邮箱'], validate: userEmailValidator}, //管理员邮箱
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
AppSchema.plugin(BaseModel);
AppSchema.index({project_name: 1, project_alias: 1, create_at: -1, update_at: -1});
mongoose.model('App', AppSchema);