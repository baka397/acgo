/**
 * @apiDefine list 
 * @apiParam {Number} [page=1] 当前页数
 * @apiParam {Number} [pageSize=10] 当前页数量
 * @apiSuccess {Array} data.content 列表数据
 * @apiSuccess {Number} data.page 当前页数
 * @apiSuccess {Number} data.pageSize 当前页数量
 * @apiSuccess {Number} data.total 数据总数量
 * @apiSuccess {String} data.content._id Object ID
 */
/**
 * @apiDefine return 
 * @apiSuccess {Number} code 返回状态码,200时为成功
 * @apiSuccess {String} msg  返回信息
 * @apiSuccess {Object} data 返回数据
 */
/**
 * @apiUse list
 * @apiUse return
 * @api {GET} /app/ Get APP List
 * @apiVersion 1.0.0
 * @apiName GetAPP
 * @apiGroup App
 * @apiDescription 获取应用列表
 * @apiPermission localhost
 * @apiSuccess {String} data.content.user_email 管理员邮箱
 * @apiSuccess {String} data.content.user_name 管理员名称
 * @apiSuccess {String} data.content.project_name 应用名称
 * @apiSuccess {String} data.content.update_at 更新时间
 */
/**
 * @apiUse return
 * @api {POST} /app/ Add APP
 * @apiVersion 1.0.0
 * @apiName AddAPP
 * @apiGroup App
 * @apiDescription 添加一个新应用
 * @apiPermission localhost
 * @apiParam {String} projectName 应用名称
 * @apiParam {String} projectAlias 应用别名,英文和数字且不能重复
 * @apiParam {String} userName 管理员名称
 * @apiParam {String} userEmail 管理员邮箱
 */
/**
 * @apiUse return
 * @api {PUT} /app/:id Update APP
 * @apiVersion 1.0.0
 * @apiName UpdateAPP
 * @apiGroup App
 * @apiDescription 更新一个新应用
 * @apiPermission localhost
 * @apiParam {String} projectName 应用名称
 * @apiParam {String} projectAlias 应用别名,英文和数字且不能重复
 * @apiParam {String} userName 管理员名称
 * @apiParam {String} userEmail 管理员邮箱
 */
/**
 * @apiUse return
 * @api {DELETE} /app/:id Delete APP
 * @apiVersion 1.0.0
 * @apiName DeleteAPP
 * @apiGroup App
 * @apiDescription 删除一个新应用
 * @apiPermission localhost
 */
/**
 * @apiUse list
 * @apiUse return
 * @api {GET} /code/ Get invitation code List
 * @apiVersion 1.0.0
 * @apiName GetCode
 * @apiGroup Code
 * @apiDescription 获取邀请码列表
 * @apiPermission localhost
 * @apiSuccess {Number=0,1,-1} data.content.status 邀请码状态,0-未使用,1-已使用,-1-已禁用
 * @apiSuccess {String} data.content.use_user 邀请码使用人Object ID
 * @apiSuccess {String} data.content.create_at 创建时间
 * @apiSuccess {String} data.content.update_at 修改时间
 */
/**
 * @apiUse return
 * @api {POST} /app/ Add invitation code
 * @apiVersion 1.0.0
 * @apiName AddCode
 * @apiGroup Code
 * @apiDescription 添加一个邀请码
 * @apiPermission localhost
 */

/**
 * @apiUse return
 * @api {PUT} /app/:id Update invitation code
 * @apiVersion 1.0.0
 * @apiName UpdateCode
 * @apiGroup Code
 * @apiDescription 更新一个邀请码
 * @apiPermission localhost
 * @apiParam {Number=0,-1} status 邀请码状态,0-未使用,-1-已禁用
 */