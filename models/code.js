'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');

var CodeSchema = new Schema({
    create_by: {
        type: String
    },
    used_by: {
        type: String
    },
    update_at: {
        type: Number,
        default: Date.now()
    },
    status:{
        type: Number,
        default:0
    }
},{
    toObject:{virtuals:true}
});

CodeSchema.plugin(BaseModel);
mongoose.model('Code', CodeSchema);