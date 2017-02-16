'use strict';
const tool = require('../../common/tool');
module.exports=function(){
    describe('Tool', function(){
        it('Call filterReqLog', function (done) {
            let data={
                test:'test',
                password:'123',
                oldPassword:'oldPassword',
                email:'email'
            }
            let result=tool.filterReqLog(data);
            let resultObj=JSON.parse(result);
            if(resultObj.password&&resultObj.oldPassword&&resultObj.email){
                return done(new Error('错误的过滤结果'));
            }
            done();
        })
        it('Call buildPromiseListByPage', function (done) {
            let promiseList=[];
            let testString='test string';
            let testObject={'test':'test'};
            let testArray=[1];
            let testObjectArray=[testObject];
            promiseList.push(tool.nextPromise(null,1));
            promiseList.push(tool.nextPromise(null,testString));
            promiseList.push(tool.nextPromise(null,testObject));
            promiseList.push(tool.nextPromise(null,testArray));
            promiseList.push(tool.nextPromise(null,testObjectArray));
            tool.buildPromiseListByPage(promiseList,3)
            .then(function(results){
                let validResult=results.every(function(result,index){
                    switch(index){
                        case 0:
                            return result===2;
                        case 1:
                            return result===1;
                        case 2:
                            return result===testString;
                        case 3:
                            return result===testObject;
                        case 4:
                            return result===testArray;
                        case 5:
                            return result===testObjectArray;
                    }
                });
                if(!validResult) throw new Error('不符合预期的测试结果');
                done();
            }).catch(function(err){
                done(err);
            })
        })
        it('Call buildPromiseListByPage with empty', function (done) {
            let promiseList=[];
            tool.buildPromiseListByPage(promiseList,3)
            .then(function(result){
                if(result){
                    done(new Error('不符合预期的测试结果'));
                }else{
                    done();
                }
            })
            .catch(function(err){
                done(err);
            })
        })
        it('Call buildPromiseListByPage with error', function (done) {
            let promiseList=[];
            promiseList.push(tool.nextPromise(new Error('测试错误')));
            tool.buildPromiseListByPage(promiseList,3)
            .then(function(){
                done(new Error('不符合预期的测试结果'));
            })
            .catch(function(err){
                if(err.message==='测试错误') done();
                else done(err);
            })
        })
        it('Call isImageName', function (done) {
            if(tool.isImageName('5885b320a1763a717629bac3-1485222972574.jpg')){
                done();
            }else{
                done(new Error('不符合预期的测试结果'));
            }
        })
        it('Call isImageName with empty', function (done) {
            if(tool.isImageName()){
                done(new Error('不符合预期的测试结果'));
            }else{
                done();
            }
        })
        it('Call isImageName with wrong string', function (done) {
            if(tool.isImageName('test')){
                done(new Error('不符合预期的测试结果'));
            }else{
                done();
            }
        })
        it('Call isImageName with wrong type', function (done) {
            if(tool.isImageName('5885b320a1763a717629bac3-test')){
                done(new Error('不符合预期的测试结果'));
            }else{
                done();
            }
        })
        it('Call isImageName with wrong id', function (done) {
            if(tool.isImageName('test-test')){
                done(new Error('不符合预期的测试结果'));
            }else{
                done();
            }
        })
    })
}