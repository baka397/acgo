module.exports = {
    db:'mongodb://127.0.0.1:27017/acgo',
    redisNamespace:'acgo-case',
    log: {
        path: './logs/',
        type: 'dateFileLog',
        level: 'info'
    },
    closeMail:true
};