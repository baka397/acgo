'use strict';
let App = require('../../models').App;
let appTest = require('./app');
module.exports=function(app){
    describe('Web', function(){
        appTest(app);
    })
}