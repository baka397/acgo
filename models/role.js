/**
 * 角色
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var tool = require('../common/tool');

var RoleSchema = new Schema({
    name:{ //角色名称
        type: String
    },
    alias:{ //角色别名
        type: String
    },
    menus:{
        type: Array
    },
    actions:{
        type: Array
    },
    update_at: {
        type: Number,
        default: Date.now()
    }
});

RoleSchema.plugin(BaseModel);

RoleSchema.index({
    alias: 1
},{
    unique: true
});

mongoose.model('Role', RoleSchema);