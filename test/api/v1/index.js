'use strict';
const apiTool = require('../tool');
let commonTest = require('./common');
let userTest = require('./user');
let tagTest = require('./tag');
module.exports=function(app){
    describe('/api/v1', function(){
        commonTest(app);
        userTest(app);
        tagTest(app);
    })
}