//合集状态
exports.status={
    '1':'正常',
    '-1':'禁用'
};
//合集类型
exports.type={
    '1':{
        'name':'B站',
        'taskRegExp':/^http:\/\/bangumi.bilibili.com\/anime\/\d+(|\/)$/i,
        'itemRegExp':/^(http:\/\/bangumi.bilibili.com\/anime\/v\/\d+|http:\/\/www.bilibili.com\/video\/av\d+\/|http:\/\/bangumi.bilibili.com\/anime\/\d+\/play#\d+)$/i
    },
    '2':{
        'name':'D站',
        'taskRegExp':/^http:\/\/www.dilidili.(com|wang)\/anime\/[a-z0-9\_\-]+(|\/)$/i,
        'itemRegExp':/^http:\/\/www.dilidili.(com|wang)\/watch[^\/]*\/\d+\/$/i
    },
    '3':{
        'name':'爱奇艺',
        'taskRegExp':/^http:\/\/www.iqiyi.com\/a_[a-z0-9\_]+.html$/i,
        'itemRegExp':/^http:\/\/www.iqiyi.com\/dongman\/\d+\/[a-z0-9\_\-]+.html$/i
    }
};
//合集任务状态
exports.taskStatus={
    '1':'正常',
    '0':'暂停',
    '-1':'停止'
};
//合集任务周期
exports.taskPeriod={
    '1':'周一',
    '2':'周二',
    '3':'周三',
    '4':'周四',
    '5':'周五',
    '6':'周六',
    '7':'周日'
};