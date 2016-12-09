'use strict';
let appTest = require('./app');
let codeTest = require('./code');
module.exports=function(app){
    describe('Web', function(){
        appTest(app);
        codeTest(app);
    })
}