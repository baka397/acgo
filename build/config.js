/**
 * 配置信息
 */

//API配置
export const IMAGE_PATH='http://o8jc34hze.bkt.clouddn.com/';
export const UPLOAD_PATH='http://upload.qiniu.com/';
export const BASE_PATH='';
export const PAGE_NUM=15;
const API_PATH='/api/0.1';
export const API_TYPE={
    GET:'GET',
    POST:'POST',
    PUT:'PUT',
    DELETE:'DELETE'
}
//公共API信息
/**
 * @apiDefine ListQuery
 * @apiParam {Number} page 跳过分页
 * 
 */
/**
 * @apiDefine ListQueryLimit
 * @apiParam {Number} page 跳过分页
 * @apiParam {Number} limit 限制数量
 * 
 */
/**
 * @apiDefine ListQueryResult
 * @apiSuccess {Number} count 查询可返回的数据总数
 * @apiSuccess {Array} list 结果列表
 */
/**
 * @apiDefine Error
 * @apiError (101) InvalidParam 错误的参数或其他信息(需返回错误信息)
 * @apiError (401) InvalidUserInfo 没有找到用户登录信息
 * @apiError (403) InvalidAuth 当前用户没有权限访问这个API
 * @apiError (404) InvalidAPI 不存在的API地址
 * @apiError (500) Error 执行错误
 */
/**
 * @apiDefine ErrorExample
 * @apiErrorExample 失败范例
 * {
 *     head:{
 *         "status":403,
 *         "msg":"当前用户没有权限访问这个API"
 *     }
 * }
 */
/**
 * @apiDefine SuccessExample
 * @apiSuccessExample 成功范例
 * {
 *     "head":{
 *         "status":200,
 *         "msg":"操作成功"
 *     }
 * }
 */
/**
 * @apiDefine JsonHeader
 * @apiHeader {String} Content-Type=application/javascript 请求类型
 * @apiHeader {String} API-TYPE=PC 请求客户端类型
 * @apiHeader {String} API-TOKEN 登录令牌
 * 
 * @apiHeaderExample 头部请求
 *  "Content-Type": "application/javascript"
 *  "API-TYPE": "PC"
 *  "API-TOKEN": "42cd2a667a4617bba385bfa0660f3f1c"
 */

//用户API
/**
 * @api {post} /user/login/ 用户登录
 * @apiName UserLogin
 * @apiGroup User
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} password 密码
 * @apiParamExample {json} 请求范例:
 * {
 *     email:"test@test.com",
 *     password:"123456"
 * }
 *
 * @apiSuccess {String} api_token 授权key
 * @apiSuccess {Array} menus 可访问目录列表
 * @apiSuccess {String} -name 目录名称
 * @apiSuccess {String} -url 目录地址
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "api_token":"授权key"
 *         "menus":[{
 *             "name":"目录名称",
 *             "url":"目录地址"
 *          }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_USER_LOGIN=API_PATH+'/user/login/';

/**
 * @api {get} /user/me/ 用户信息
 * @apiName UserSelf
 * @apiGroup User
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {Array} menus 可访问目录列表
 * @apiSuccess {String} -name 目录名称
 * @apiSuccess {String} -url 目录地址
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "menus":[{
 *             "name":"目录名称",
 *             "url":"目录地址"
 *          }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_USER_ME=API_PATH+'/user/me/';

//playlist
/**
 * @api {get} /playlist/me/ 用户播放列表信息
 * @apiName PlaylistSelf
 * @apiGroup Playlist
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryLimit
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} -_id 播放视频ID
 * @apiSuccess {String} -name 视频名称
 * @apiSuccess {String} -circle_name 视频圈子名称
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "count":10,
 *         "list":[{
 *             "_id":"视频ID",
 *             "name":"视频名称",
 *             "circle_name":"视频圈子名称"
 *          }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_PLAYLIST_ME=API_PATH+'/playlist/me/';

//目录API
/**
 * @api {get} /menuCate/ 获取目录分类列表
 * @apiName GetMenuCate
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 分类ID
 * @apiSuccess {String} name 分类名称
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"目录ID",
 *             "name":"目录名称"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {get} /menuCate/:id 获取目录分类详情
 * @apiName GetMenuCateDetail
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {String} _id 分类ID
 * @apiSuccess {String} name 分类名称
 * @apiSuccess {String} order 分类排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "_id":"目录ID",
 *         "name":"目录名称",
 *         "order":1
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /menuCate/ 新增目录分类
 * @apiName PostMenuCate
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} name 目录名称
 * @apiParam {Number} order 目录排序
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {put} /menuCate/ 编辑目录分类
 * @apiName PutMenuCate
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} id 目录id
 * @apiParam {String} name 目录名称
 * @apiParam {Number} order 目录排序
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {delete} /menuCate/:id 删除目录分类
 * @apiName DeleteMenuCateDetail
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"删除成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_MENU_CATE=API_PATH+'/menuCate/';

/**
 * @api {get} /menu/ 获取目录列表
 * @apiName GetMenu
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 目录ID
 * @apiSuccess {String} name 目录名称
 * @apiSuccess {String} path 目录路径
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"目录ID",
 *             "name":"目录名称",
 *             "path":"目录路径"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {get} /menu/:id 获取目录详情
 * @apiName GetMenuDetail
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {String} _id 目录ID
 * @apiSuccess {String} name 目录名称
 * @apiSuccess {String} path 目录名称
 * @apiSuccess {String} parent_id 分类目录
 * @apiSuccess {String} order 目录排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "_id":"目录ID",
 *         "name":"目录名称",
 *         "order":1,
 *         "path":"目录路径",
 *         "parent_id":"目录分类"
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /menu/ 新增目录
 * @apiName PostMenu
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} name 目录名称
 * @apiParam {Number} order 目录排序
 * @apiParam {String} parent 目录分类
 * @apiParam {String} path 目录路径
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {put} /menu/ 编辑目录
 * @apiName PutMenu
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} id 目录id
 * @apiParam {String} name 目录名称
 * @apiParam {Number} order 目录排序
 * @apiParam {String} parent 目录分类
 * @apiParam {String} path 目录路径
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {delete} /menu/:id 删除目录
 * @apiName DeleteMenuDetail
 * @apiGroup Menu
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"删除成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_MENU=API_PATH+'/menu/';

//权限API
/**
 * @api {get} /actionCate/ 获取权限分类列表
 * @apiName GetActionCate
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 分类ID
 * @apiSuccess {String} name 分类名称
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"分类ID",
 *             "name":"分类名称"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {get} /actionCate/:id 获取权限分类详情
 * @apiName GetActionCateDetail
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {String} _id 分类ID
 * @apiSuccess {String} name 分类名称
 * @apiSuccess {String} order 分类排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "_id":"分类ID",
 *         "name":"分类名称",
 *         "order":1
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /actionCate/ 新增权限分类
 * @apiName PostActionCate
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} name 分类名称
 * @apiParam {Number} order 分类排序
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {put} /actionCate/ 编辑权限分类
 * @apiName PutActionCate
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} id 分类id
 * @apiParam {String} name 分类名称
 * @apiParam {Number} order 分类排序
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"更新成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {delete} /actionCate/:id 删除权限分类
 * @apiName DeleteActionCateDetail
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"删除成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_ACTION_CATE=API_PATH+'/actionCate/';

/**
 * @api {get} /action/ 获取权限列表
 * @apiName GetAction
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 权限ID
 * @apiSuccess {String} name 权限名称
 * @apiSuccess {Number} post_type 请求类型,1.get,2.post,3.put,4.delete
 * @apiSuccess {String} path 权限路径
 * @apiSuccess {String} alias 权限别名
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"权限ID",
 *             "name":"权限名称",
 *             "path":"权限路径",
 *             "post_type":1,
 *             "alias":"test"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {get} /action/:id 获取权限详情
 * @apiName GetActionDetail
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {String} _id 权限ID
 * @apiSuccess {String} name 权限名称
 * @apiSuccess {Number} post_type 请求类型,1.get,2.post,3.put,4.delete
 * @apiSuccess {String} path 权限路径
 * @apiSuccess {String} alias 权限别名
 * @apiSuccess {String} parent_id 分类
 * @apiSuccess {String} order 权限排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "_id":"权限ID",
 *         "name":"权限名称",
 *         "path":"权限路径",
 *         "post_type":1,
 *         "alias":"test"
 *         "order":1,
 *         "parent_id":"权限分类"
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /action/ 新增权限
 * @apiName PostAction
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiSuccess {String} name 权限名称
 * @apiSuccess {Number} post_type 请求类型,1.get,2.post,3.put,4.delete
 * @apiSuccess {String} path 权限路径
 * @apiSuccess {String} alias 权限别名
 * @apiSuccess {String} parent_id 分类
 * @apiSuccess {String} order 权限排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {put} /action/ 编辑权限
 * @apiName PutAction
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} id 目录id
 * @apiSuccess {String} name 权限名称
 * @apiSuccess {Number} post_type 请求类型,1.get,2.post,3.put,4.delete
 * @apiSuccess {String} path 权限路径
 * @apiSuccess {String} alias 权限别名
 * @apiSuccess {String} parent_id 分类
 * @apiSuccess {String} order 权限排序,越大排序越后
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {delete} /action/:id 删除权限
 * @apiName DeleteActionDetail
 * @apiGroup Action
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"删除成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_ACTION=API_PATH+'/action/';

//角色API
/**
 * @api {get} /role/ 获取角色列表
 * @apiName GetRole
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 角色ID
 * @apiSuccess {String} name 角色名称
 * @apiSuccess {String} alias 角色别名
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"分类ID",
 *             "name":"分类名称",
 *             "alias":"角色别名"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {get} /role/:id 获取角色详情
 * @apiName GetRoleDetail
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 *
 * @apiSuccess {String} _id 角色ID
 * @apiSuccess {String} name 角色名称
 * @apiSuccess {String} alias 角色别名
 * @apiSuccess {String} menus 目录列表
 * @apiSuccess {String} actions 权限列表
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         "_id":"分类ID",
 *         "name":"分类名称",
 *         "alias":"角色别名",
 *         "menus":[],
 *         "actions":[]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /role/ 新增角色
 * @apiName PostRole
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} name 角色名称
 * @apiParam {String} alias 角色别名
 * @apiParam {String} menus 目录列表
 * @apiParam {String} actions 权限列表
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {put} /role/ 编辑角色
 * @apiName PutRole
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiParam {String} id 角色ID
 * @apiParam {String} name 角色名称
 * @apiParam {String} alias 角色别名
 * @apiParam {String} menus 目录列表
 * @apiParam {String} actions 权限列表
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"更新成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {delete} /role/:id 删除角色
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"删除成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_ROLE=API_PATH+'/role/';

/**
 * @api {get} /roleSync/ 同步角色
 * @apiName SyncRole
 * @apiGroup Role
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"同步成功"
 *     },
 *     body:{
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_ROLE_SYNC=API_PATH+'/roleSync/';

//邀请码API
/**
 * @api {get} /code/ 获取邀请码列表
 * @apiName GetCode
 * @apiGroup Code
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiUse ListQuery
 * @apiUse ListQueryResult
 *
 * @apiSuccess {String} _id 邀请码ID
 * @apiSuccess {String} create_by 创建人ID
 * @apiSuccess {String} used_by 使用人ID
 * @apiSuccess {Number} create_at 创建时间
 * @apiSuccess {Number} update_at 使用时间
 * @apiSuccess {Number} status 使用状态,0为未使用,1.已使用
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"获取成功"
 *     },
 *     body:{
 *         count:10,
 *         list:[{
 *             "_id":"邀请码ID",
 *             "create_by":"创建人ID",
 *             "used_by":"使用人ID"
 *         }]
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
/**
 * @api {post} /code/ 新增邀请码
 * @apiName PostCode
 * @apiGroup Code
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * 
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{}
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_CODE=API_PATH+'/code/';

//上传API
/**
 * @api {get} /upload/ 获取上传key
 * @apiName GetUpload
 * @apiGroup Upload
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiSuccess {String} token 授权key
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{
 *         "token":"授权key"
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_UPLOAD_TOKEN=API_PATH+'/upload/';

//资源API
/**
 * @api {get} /resource/:id 获取资源详情
 * @apiName GetResourceByID
 * @apiGroup Resource
 * @apiPermission 登录用户
 * @apiVersion 1.0.0
 *
 * @apiUse JsonHeader
 * @apiSuccess {String} name 资源名称
 * @apiSuccess {String} type 资源类型,flash/webview
 * @apiSuccess {String} alias 资源别名
 * @apiSuccess {String} url 资源地址
 * @apiSuccess (type=webview) {String} script script地址
 * @apiSuccessExample 成功范例
 * {
 *     head:{
 *         "status":200,
 *         "msg":"添加成功"
 *     },
 *     body:{
 *         "name": "测试资源标题",
 *         "type": "flash",
 *         "alias": "youku",
 *         "url": "http://v.youku.com/v_show/id_XMTY4ODQ2NTAxMg==.html"
 *     }
 * }
 * @apiUse Error
 * @apiUse ErrorExample
 */
export const API_RESOURCE_DETAIL=API_PATH+'/resource/';