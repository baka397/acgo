'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseModel = require('./base_model');
var tool = require('../common/tool');

var UserSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String
    },
    avatar: {
        type: String
    },
    is_block: {
        type: Boolean,
        default: false
    },
    weibo: {
        type: String
    },
    intro: {
        type: String
    },
    update_at: {
        type: Number,
        default: Date.now()
    }
},{
    toObject:{virtuals:true}
});

UserSchema.plugin(BaseModel);

UserSchema.index({
    email: 1
}, {
    unique: true
});

//制造API token
UserSchema.virtual('api_token').get(function() {
    let api_token=tool.packApiToken(this._id,this.update_at);
    return api_token;
});
mongoose.model('User', UserSchema);