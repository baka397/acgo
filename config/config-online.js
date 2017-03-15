module.exports = {
    db:'mongodb://root:d6b5124691e7ba034c30770ef9fbcc6a@10.8.75.164:30015',
    redisNamespace:'acgo-online',
    redis:{
        port:6379,
        host:'10.8.75.52'
    },
    log: {
        path: './logs/',
        type: 'dateFileLog',
        level: 'info'
    },
    qiniu:{
        bucket:'acgo',
        accessKey:'7h1BLnvFNImqMR8xWXUOAexEOdvpzfDqynAWvRFH',
        sercetKey:'IqVhcvdxBWVJ_P3gAFR9SNjIYIyV0GiIM27YyDCP'
    },
    //管理员配置
    admins:{
        'crawler@acgo.club':'crawler',
        'cqggff@live.com':'admin',
        '460272267@qq.com':'admin' // na
    },
    //运营配置
    maxPageNum:50
};