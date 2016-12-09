module.exports = {
    db:'mongodb://127.0.0.1:27017/acgo',
    log: {
        path: './logs/',
        type: 'dateFileLog',
        level: 'info'
    },
    redisNodes:[
        {'port':'6379','host':'127.0.0.1'}
    ]
}