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
 * @apiDefine apiheader
 * @apiHeader {String} x-req-token MD5编译后的token
 * @apiHeader {Number} x-req-timestamp 客户端产生本次请求的unix时间戳（UTC），精确到毫秒。
 * @apiHeader {Number} x-req-project 应用别名
 * @apiHeader {Number} [x-req-key] 用户key,需要验证用户的接口传输.
 */
/**
 * @apiDefine animeListInfo
 * @apiSuccess {String} data.content.name 动画名称
 * @apiSuccess {String} data.content.alias 动画别名
 * @apiSuccess {String} data.content.cover 动画封面
 * @apiSuccess {Array} data.content.cover_clip 动画封面裁剪比例
 * @apiSuccess {Number=0,1,2} data.content.show_status 动画状态,0-未开始,1-连载中,2-已完结
 * @apiSuccess {Array} data.content.lastUpdateGroupType 集数类型
 * @apiSuccess {Array} data.content.lastUpdateGroupNum 最后更新集数,与类型一一对应
 */
/**
 * @apiDefine search
 * @apiParam {String} keyword 搜索关键字
 */

//用户接口
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /user/ User register
 * @apiVersion 1.0.0
 * @apiName AddUser
 * @apiGroup User
 * @apiDescription 注册一个新用户
 * @apiPermission none
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} nickname 用户昵称
 * @apiParam {String} password 用户密码,请使用MD5加密后大写化
 * @apiParam {String} code 邀请码
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /user/login User login
 * @apiVersion 1.0.0
 * @apiName UserLogin
 * @apiGroup User
 * @apiDescription 用户登录
 * @apiPermission none
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} password 用户密码,请使用MD5加密后大写化
 * @apiSuccess {String} data.key 登录用户授权key,无续期情况下24小时内有效,自动续期
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /user/email User send password reset email 
 * @apiVersion 1.0.0
 * @apiName UserEmail
 * @apiGroup User
 * @apiDescription 用户找回密码
 * @apiPermission none
 * @apiParam {String} email 用户邮箱
 * @apiParam {String} backurl 返回地址,邮件会按照该地址后添加#+key,该key有效时间为10分钟
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /user/password User change password
 * @apiVersion 1.0.0
 * @apiName UserPassword
 * @apiGroup User
 * @apiDescription 用户设置密码
 * @apiPermission user
 * @apiParam {String} oldPassword 用户原密码
 * @apiParam {String} password 用户密码
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {GET} /user/me Get User profile
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription 查看用户信息
 * @apiPermission user
 * @apiParam {String} nickname 用户昵称
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /user/me Update User profile
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 * @apiDescription 更新用户信息
 * @apiPermission user
 * @apiParam {String} nickname 用户昵称
 */
//动画信息
/**
 * @apiUse return
 * @apiUse apiheader
 * @apiUse list
 * @apiUse animeListInfo
 * @api {GET} /anime/sub/me Get User sub list
 * @apiVersion 1.0.0
 * @apiName GetUserAnimeSubList
 * @apiGroup Anime
 * @apiDescription 查看用户时间轴信息
 * @apiPermission user
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @apiUse list
 * @apiUse animeListInfo
 * @apiUse search
 * @api {GET} /anime/ Get Anime list
 * @apiVersion 1.0.0
 * @apiName GetAnime
 * @apiGroup Anime
 * @apiDescription 查看动画列表
 * @apiPermission user
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {GET} /anime/:id Get Anime detail
 * @apiVersion 1.0.0
 * @apiName GetAnimeDetail
 * @apiGroup Anime
 * @apiDescription 查看动画详情
 * @apiPermission user
 * @apiSuccess {String} data.name 动画名称
 * @apiSuccess {String} data.alias 动画别名
 * @apiSuccess {String} data.cover 动画封面
 * @apiSuccess {Array}  data.cover_clip 动画封面裁剪比例
 * @apiSuccess {Number=0,1,2} data.show_status 动画状态,0-未开始,1-连载中,2-已完结
 * @apiSuccess {String} data.desc 动画描述
 * @apiSuccess {Array} data.tag 动画标签,存储动画标签ID
 * @apiSuccess {Array} data.staff 动画制作人员,存储动画制作人员ID
 * @apiSuccess {Array} data.cv 动画声优,存储动画声优ID
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {GET} /anime/audit/:id Get Anime audit detail
 * @apiVersion 1.0.0
 * @apiName GetAnimeAuditDetail
 * @apiGroup Anime
 * @apiDescription 查看动画审核详情
 * @apiPermission user
 * @apiSuccess {String} data.alias 动画别名
 * @apiSuccess {String} data.cover 动画封面
 * @apiSuccess {Array} data.cover_clip 动画封面裁剪比例
 * @apiSuccess {Number=0,1,2} data.show_status 动画状态,0-未开始,1-连载中,2-已完结
 * @apiSuccess {String} data.desc 动画描述
 * @apiSuccess {Array} data.tag 动画标签,存储动画标签ID
 * @apiSuccess {Array} data.staff 动画制作人员,存储动画制作人员ID
 * @apiSuccess {Array} data.cv 动画声优,存储动画声优ID
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /anime/ Add Anime detail
 * @apiVersion 1.0.0
 * @apiName AddAnime
 * @apiGroup Anime
 * @apiDescription 添加动画
 * @apiPermission user
 * @apiParam {String} name 动画名称
 * @apiParam {String} alias 动画别名
 * @apiParam {String} cover 动画封面
 * @apiParam {Array} cover_clip 动画封面裁剪比例
 * @apiParam {Number=0,1,2} show_status 动画状态,0-未开始,1-连载中,2-已完结
 * @apiParam {String} desc 动画描述
 * @apiParam {Array} tag 动画标签,存储动画标签ID
 * @apiParam {Array} staff 动画制作人员,存储动画制作人员ID
 * @apiParam {Array} cv 动画声优,存储动画声优ID
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /anime/:id Update Anime detail
 * @apiVersion 1.0.0
 * @apiName UpdateAnime
 * @apiGroup Anime
 * @apiDescription 修改动画
 * @apiPermission user
 * @apiParam {String} [name] 动画名称
 * @apiParam {String} [alias] 动画别名
 * @apiParam {String} [cover] 动画封面
 * @apiParam {Array} cover_clip 动画封面裁剪比例
 * @apiParam {Number=0,1,2} [show_status] 动画状态,0-未开始,1-连载中,2-已完结
 * @apiParam {String} [desc] 动画描述
 * @apiParam {Array} [data.tag] 动画标签,存储动画标签ID
 * @apiParam {Array} [data.staff] 动画制作人员,存储动画制作人员ID
 * @apiParam {Array} [data.cv] 动画声优,存储动画声优ID
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /anime/audit/:auditId Audit Anime
 * @apiVersion 1.0.0
 * @apiName AuditAnime
 * @apiGroup Anime
 * @apiDescription 审核动画编辑信息
 * @apiPermission admin
 * @apiParam {Number=0,1,-1} status 动画状态,0-未审核,1-已通过,-1-未通过
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /anime/sub/:id Subscribe Anime
 * @apiVersion 1.0.0
 * @apiName SubscribeAnime
 * @apiGroup Anime
 * @apiDescription 订阅动画
 * @apiPermission user
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {DELETE} /anime/sub/:id Unsubscribe Anime
 * @apiVersion 1.0.0
 * @apiName UnsubscribeAnime
 * @apiGroup Anime
 * @apiDescription 取消订阅动画
 * @apiPermission user
 */
//动画集合
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {GET} /anime/group/:animeId Get Anime group
 * @apiVersion 1.0.0
 * @apiName GetAnimeGroup
 * @apiGroup AnimeGroup
 * @apiDescription 获取动画集合
 * @apiPermission user
 * @apiSuccess {Number} type 动画集合类型
 * @apiSuccess {String} url 动画集合地址
 * @apiSuccess {String} episode_no 动画分集编号
 * @apiSuccess {String} episode_name 动画分集名称
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /anime/group/:animeId Add Anime group
 * @apiVersion 1.0.0
 * @apiName AddAnimeGroup
 * @apiGroup AnimeGroup
 * @apiDescription 添加动画集合
 * @apiPermission user
 * @apiParam {Number} type 动画集合类型
 * @apiParam {String} url 动画集合地址
 * @apiParam {String} episodeNo 动画分集编号
 * @apiParam {String} episodeName 动画分集名称
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {PUT} /anime/group/:itemId Update Anime group item
 * @apiVersion 1.0.0
 * @apiName UpdateAnimeGroupItem
 * @apiGroup AnimeGroup
 * @apiDescription 修改动画集合项
 * @apiPermission user
 * @apiParam {Number} type 动画集合类型
 * @apiParam {String} url 动画集合地址
 * @apiParam {String} episodeNo 动画分集编号
 * @apiParam {String} episodeName 动画分集名称
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /anime/group/task Add Anime group task
 * @apiVersion 1.0.0
 * @apiName AddAnimeGroupTask
 * @apiGroup AnimeGroup
 * @apiDescription 添加动画集合自动抓取任务
 * @apiPermission user
 * @apiParam {Number} type 动画集合类型
 * @apiParam {String} url 动画集合抓取地址
 * @apiParam {Number{1-7}} period 动画集合抓取周期,每周1-7
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /anime/group/watch/:itemId Watch Anime group item
 * @apiVersion 1.0.0
 * @apiName WatchAnimeGroupItem
 * @apiGroup AnimeGroup
 * @apiDescription 记录动画浏览信息
 * @apiPermission user
 */
//标签
/**
 * @apiUse return
 * @apiUse apiheader
 * @apiUse list
 * @apiUse search
 * @api {GET} /tag/ Get Tag list
 * @apiVersion 1.0.0
 * @apiName GetTag
 * @apiGroup Tag
 * @apiDescription 查看标签列表
 * @apiPermission user
 * @apiParam {String} [keywords] 标签关键字,如果有关键字,则以关键字查询,如果无,则以ids查询
 * @apiParam {Number=1,2,3} [type] 标签类型,1-动画,2-制作人员,3-声优
 * @apiParam {String} [ids] 包含的标签ID,以,分割多个
 * @apiSuccess {String} data.content.name 标签名称
 * @apiSuccess {String} data.content.alias 标签别名
 */
/**
 * @apiUse return
 * @apiUse apiheader
 * @api {POST} /tag/ Add Tag
 * @apiVersion 1.0.0
 * @apiName AddTag
 * @apiGroup Tag
 * @apiDescription 添加标签列表
 * @apiPermission user
 * @apiParam {String} name 标签名称
 * @apiParam {String} alias 标签别名
 *  @apiParam {Number=1,2,3} type 标签类型,1-动画,2-制作人员,3-声优
 */