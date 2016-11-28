/**
 * 权限目录
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var tool = require('../common/tool');

var ActionSchema = new Schema({
    name:{ //权限/权限分类名称
        type: String
    },
    type:{ //权限类型.1.权限分类,2.权限
        type: Number
    },
    post_type:{ //权限类型
        type: Number
    },
    order:{ //排序
        type: Number
    },
    parent_id:{ //父ID
        type: String
    },
    alias:{ //权限别名
        type: String
    },
    path:{ //权限路径
        type: String
    },
    update_at: {
        type: Number,
        default: Date.now()
    }
});

ActionSchema.plugin(BaseModel);

ActionSchema.index({
    order: 1
});
ActionSchema.index({
    path: 1
});
ActionSchema.index({
    parent_id: 1
});
ActionSchema.index({
    alias: 1
});

mongoose.model('Action', ActionSchema);