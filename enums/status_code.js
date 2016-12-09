//状态码
module.exports={
    SUCCESS:200, //成功
    FORBIDDEN:403, //无权限
    NOT_FOUND:404, //无页面
    ERROR:110, //未知的错误
    MONGO_ERROR:111, //数据库更新错误
    MONGO_UNIQUE_ERROR:11000,//数据库已存在唯一键
    UNKNOWN_ERROR:500, //未知错误
}