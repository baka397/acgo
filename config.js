var config = {
    title: 'ACGO', //项目名称
    debug: true, //debug模式
    port: 2500, //express端口
    api_version: '0.1',
    password_salt: '2BE61F6C1E4A71179FECA2B2797F8B3F',
    token_salt: '35C0C547C57A56A4F03BDFE1C385CE0D',
    //mongodb
    db: 'mongodb://127.0.0.1/acgo',
    //redis
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    //API访问限制
    acl_min_limit: 0, //ACL每分钟最多请求次数,0为不限
    acl_day_limit: 0, //ACL每日最多错误次数,0为不限
    // 7牛的access信息，用于文件上传
    qn_access: {
        accessKey: '7h1BLnvFNImqMR8xWXUOAexEOdvpzfDqynAWvRFH',
        secretKey: 'IqVhcvdxBWVJ_P3gAFR9SNjIYIyV0GiIM27YyDCP',
        /* 测试空间
        bucket: 'acdata-test',
        domain: 'http://7xlj9q.com1.z0.glb.clouddn.com/',
        */
        bucket: 'acgo-test',
        domain: 'http://o8jc34hze.bkt.clouddn.com/'
    },
    //运营配置
    page_num: 15 //分页数量
}
module.exports = config;