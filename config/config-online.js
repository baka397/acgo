module.exports = {
    db:'mongodb://root:d6b5124691e7ba034c30770ef9fbcc6a@10.8.75.164:30015/acgo-online',
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