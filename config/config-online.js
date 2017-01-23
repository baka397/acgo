module.exports = {
    db:'mongodb://root:a54a70c52d4e9af82f057267f574e21d@10.8.74.36:30015/acgo-online',
    redisNamespace:'acgo-online',
    redis:{
        port:6379,
        host:'10.8.75.52'
    },
    log: {
        path: './logs/',
        type: 'dateFileLog',
        level: 'info'
    }
}