'use strict';
const engTest = require('./pure_eng');
const chnTest = require('./chinese');
module.exports=function(app){
    describe('Seach engine', function(){
        engTest();
        chnTest();
    })
}