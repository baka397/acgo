//给所有的 Model 扩展功能
var tool = require('../common/tool');
module.exports = function (schema) {
  schema.pre('save', function (next) {
    if(this.update_at){
        this.update_at = new Date;
    }
    next()
  })
};