'use strict';
const apiTool = require('../tool');
let commonTest = require('./common');
let userTest = require('./user');
let userFollowTest = require('./user_follow');
let tagTest = require('./tag');
let animeTest = require('./anime');
let animeGroupTest = require('./anime_group');
let uploadTest = require('./upload');
let analyticsTest = require('./analytics');
let timelineTest = require('./timeline');
module.exports=function(app){
    describe('/api/v1', function(){
        commonTest(app);
        userTest(app);
        tagTest(app);
        animeTest(app);
        animeGroupTest(app);
        uploadTest(app);
        analyticsTest(app);
        userFollowTest(app);
        timelineTest(app);
    })
}