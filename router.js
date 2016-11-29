'use strict';
/**
 * 自动注入所有Controller
 */
let fs = require('fs');
let path = require('path');
let tool = require('./common/tool');
module.exports = function(app) {
	// 读取web下所有controller
	let controllerDir = path.join(__dirname, 'controllers/web');
	let files = fs.readdirSync(controllerDir);
	for (let i in files) {
		let filename = files[i];
		let controller = require(path.join(controllerDir, filename));
		app.use(controller.requestMapping, controller.router);
	}
    //版本信息
    let versionList = ['v1'];
    versionList.forEach(function(version){
        //读取API所有版本controller
        let controllerApiVersionDir = path.join(__dirname, 'controllers/api/'+version);
        let filesApi = fs.readdirSync(controllerApiVersionDir);
        for (let i in filesApi) {
            let filename = filesApi[i];
            let controller = require(path.join(controllerApiVersionDir, filename));
            app.use('/api/'+version+controller.requestMapping, controller.router);
        }
    })
};