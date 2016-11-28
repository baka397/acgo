'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var tool = require('../common/tool');

var LogSchema = new Schema({
    user_id: {
        type: String
    },
    ip: {
        type: String
    },
    url:{
        type: String
    },
    method:{
        type: String
    },
    status:{
        type: Number
    }
});
LogSchema.plugin(BaseModel);
mongoose.model('Log', LogSchema);