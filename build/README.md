API文档生成
apidoc -i ./ -o ./apidoc/

数据结构
{
    "common":Object, //用户信息
    "login":{ //登录信息
        "status":Boolen, //用户登录状态
        "api_token":String, //授权key
        "cate_select":String,//目录导航
        "menu_cates":Array, //目录分类列表
        "menus":[{
            "name":String, //目录分类名称
            "path":String, //目录地址
            "parent_id":String //目录分类ID
        }]
    },
    "menu":{
        "cates":[{//目录分类
            "_id":String, //分类目录ID
            "name":String //分类目录名称
        }],
        "cate_detail":{//当前目录分类
            "_id":String, //分类目录ID
            "name":String, //分类目录名称
            "order":Number //分类排序,越大排序越后
        }
        "menus":[{//目录
            "_id":String, //目录ID
            "name":String, //目录名称
            "parent_id":String, //分类ID
            "path":String //目录路径
        }],
        "menu_detail":{//当前目录分类
            "_id":String, //目录ID
            "name":String, //目录名称
            "order":Number, //目录排序,越大排序越后
            "parent_id":String, //目录分类
            "path":String //目录路径
        }
    },
    "action":{
        "cates":[{//权限分类
            "_id":String, //分类权限ID
            "name":String //分类权限名称
        }],
        "cate_detail":{//当前权限分类
            "_id":String, //分类权限ID
            "name":String, //分类权限名称
            "order":Number //分类排序,越大排序越后
        }
        "actions":[{//权限
            "_id":String, //权限ID
            "name":String, //权限名称
            "path":String, //权限路径
            "post_type":Number, //请求类型,1.get,2.post,3.put,4.delete
            "parent_id":String, //分类ID
            "alias":String //权限别名
        }],
        "action_detail":{//当前权限分类
            "_id":String, //权限ID
            "name":String, //权限名称
            "path":String, //权限路径
            "post_type":Number, //请求类型
            "alias":String, //权限别名
            "order":Number, //权限排序,越大排序越后
            "parent_id":String, //权限分类
        }
    },
    "role":{
        "roles":[{//角色
            "_id":String, //角色ID
            "name":String, //角色名称
            "alias":String //角色别名
        }],
        "role_detail":{//当前角色
            "_id":String, //角色ID
            "name":String, //橘色名称
            "alias":String, //角色别名
            "menus":Array, //目录列表
            "actions":Array //权限列表
        }
    },
    "code":{
        "codes":[{//邀请码
            "_id":String, //邀请码ID
            "create_by":String, //创建人
            "used_by":String, //使用人
            "create_at":timestamp, //创建时间
            "update_at":timestamp, //使用时间
            "status":Number //使用状态,0为未使用,1.已使用
        }],
        "page":Number, //当前分页
        "count":Number //总数
    }
}