ACGO API Project
============
提供ACGO API的访问

采用技术
----------
服务端：nodejs+express+log4js+ejs+Mongoose
<br/>
数据库：MongoDb
<br/>
缓存服务：Redis
<br/>
接口测试：mocha(测试用例)、supertest（请求测试）、nock（网络请求控制）、istanbul（覆盖测试）
<br/>
接口文档生成：APIdoc

开发规范
--------
重要文件入口
<br />
-路由控制：controllers/
<br />
-Model：models/
<br />
-Model代理：Proxy/
<br />
-枚举：enums/
<br />
-测试用例：test/
<br />
-系统配置：config/config-*.js
<br />
日志采用log4js、全局对象LOG、支持trace、debug、info、warn、error、fatal
<br />

文档生成
----------
##安装apidoc
```
npm install apidoc -g
```

##生成文档
```
apidoc -i docs/api -o docs/apidoc
```

初始化命令
----------
## windows
### 添加应用
```
set NODE_INIT_CASE=addapp
set NODE_INIT_PNAME=应用名称
set NODE_INIT_ALIAS=应用别名
set NODE_INIT_UNAME=用户名称
set NODE_INIT_EMAIL=用户邮箱
npm run init
```

### 添加邀请码
```
set NODE_INIT_CASE=code
npm run init
```

### 初始化搜索引擎数据
```
set NODE_INIT_CASE=search
npm run init
```

## linux
请使用shell文件
