/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */

module.exports = function(schema) {
    schema.add({
        create_at: {
            type: Number,
            default: Date.now()
        }
    })

    schema.pre('save', function(next) {
        //更新编辑时间
        if(this.update_at){
            this.update_at = Date.now();
        }
        next();
    })
};