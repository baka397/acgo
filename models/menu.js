/**
 * 权限目录
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var tool = require('../common/tool');

var MenuSchema = new Schema({
    name:{ //目录/目录分类名称
        type: String
    },
    path:{ //目录地址
        type: String
    },
    type:{ //目录类型.1.目录分类,2.目录
        type: Number
    },
    order:{ //排序
        type: Number
    },
    parent_id:{ //父ID
        type: String
    },
    update_at: {
        type: Number,
        default: Date.now()
    }
});

MenuSchema.plugin(BaseModel);

MenuSchema.index({
    order: 1
});
MenuSchema.index({
    parent_id: 1
});

mongoose.model('Menu', MenuSchema);