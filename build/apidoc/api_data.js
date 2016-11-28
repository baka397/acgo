define({ "api": [
  {
    "type": "delete",
    "url": "/actionCate/:id",
    "title": "删除权限分类",
    "name": "DeleteActionCateDetail",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"删除成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/action/:id",
    "title": "删除权限",
    "name": "DeleteActionDetail",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"删除成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/action/",
    "title": "获取权限列表",
    "name": "GetAction",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>权限ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>权限名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "post_type",
            "description": "<p>请求类型,1.get,2.post,3.put,4.delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>权限路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>权限别名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"权限ID\",\n            \"name\":\"权限名称\",\n            \"path\":\"权限路径\",\n            \"post_type\":1,\n            \"alias\":\"test\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/actionCate/",
    "title": "获取权限分类列表",
    "name": "GetActionCate",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"分类ID\",\n            \"name\":\"分类名称\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/actionCate/:id",
    "title": "获取权限分类详情",
    "name": "GetActionCateDetail",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>分类排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"_id\":\"分类ID\",\n        \"name\":\"分类名称\",\n        \"order\":1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/action/:id",
    "title": "获取权限详情",
    "name": "GetActionDetail",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>权限ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>权限名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "post_type",
            "description": "<p>请求类型,1.get,2.post,3.put,4.delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>权限路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>权限别名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>权限排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"_id\":\"权限ID\",\n        \"name\":\"权限名称\",\n        \"path\":\"权限路径\",\n        \"post_type\":1,\n        \"alias\":\"test\"\n        \"order\":1,\n        \"parent_id\":\"权限分类\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/action/",
    "title": "新增权限",
    "name": "PostAction",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>权限名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "post_type",
            "description": "<p>请求类型,1.get,2.post,3.put,4.delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>权限路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>权限别名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>权限排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/actionCate/",
    "title": "新增权限分类",
    "name": "PostActionCate",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>分类排序</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/action/",
    "title": "编辑权限",
    "name": "PutAction",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>目录id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>权限名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "post_type",
            "description": "<p>请求类型,1.get,2.post,3.put,4.delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>权限路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>权限别名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>权限排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/actionCate/",
    "title": "编辑权限分类",
    "name": "PutActionCate",
    "group": "Action",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>分类排序</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"更新成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Action",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/user/login/",
    "title": "用户登录",
    "name": "GetAdmin",
    "group": "Admin",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求范例:",
          "content": "{\n    email:\"test@test.com\",\n    password:\"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api_token",
            "description": "<p>授权key</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "menus",
            "description": "<p>可访问目录列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-url",
            "description": "<p>目录地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"api_token\":\"授权key\"\n        \"menus\":[{\n            \"name\":\"目录名称\",\n            \"url\":\"目录地址\"\n         }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/code/",
    "title": "获取邀请码列表",
    "name": "GetCode",
    "group": "Code",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>邀请码ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "create_by",
            "description": "<p>创建人ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "used_by",
            "description": "<p>使用人ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"邀请码ID\",\n            \"create_by\":\"创建人ID\",\n            \"used_by\":\"使用人ID\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Code",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>跳过分页</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/code/",
    "title": "新增邀请码",
    "name": "PostCode",
    "group": "Code",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Code",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "D__node_program_acgo_build_apidoc_main_js",
    "groupTitle": "D__node_program_acgo_build_apidoc_main_js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/menuCate/:id",
    "title": "删除目录分类",
    "name": "DeleteMenuCateDetail",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"删除成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/menu/:id",
    "title": "删除目录",
    "name": "DeleteMenuDetail",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"删除成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/menu/",
    "title": "获取目录列表",
    "name": "GetMenu",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>目录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>目录路径</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"目录ID\",\n            \"name\":\"目录名称\",\n            \"path\":\"目录路径\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/menuCate/",
    "title": "获取目录分类列表",
    "name": "GetMenuCate",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"目录ID\",\n            \"name\":\"目录名称\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/menuCate/:id",
    "title": "获取目录分类详情",
    "name": "GetMenuCateDetail",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>分类ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>分类排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"_id\":\"目录ID\",\n        \"name\":\"目录名称\",\n        \"order\":1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/menu/:id",
    "title": "获取目录详情",
    "name": "GetMenuDetail",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>目录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>分类目录</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>目录排序,越大排序越后</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"_id\":\"目录ID\",\n        \"name\":\"目录名称\",\n        \"order\":1,\n        \"path\":\"目录路径\",\n        \"parent_id\":\"目录分类\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/menu/",
    "title": "新增目录",
    "name": "PostMenu",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>目录排序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>目录分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>目录路径</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/menuCate/",
    "title": "新增目录分类",
    "name": "PostMenuCate",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>目录排序</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/menu/",
    "title": "编辑目录",
    "name": "PutMenu",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>目录id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>目录排序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>目录分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>目录路径</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/menuCate/",
    "title": "编辑目录分类",
    "name": "PutMenuCate",
    "group": "Menu",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>目录id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>目录名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>目录排序</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Menu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/role/:id",
    "title": "删除角色",
    "name": "DeleteRole",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"删除成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/role/",
    "title": "获取角色列表",
    "name": "GetRole",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>角色别名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>查询可返回的数据总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>结果列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        count:10,\n        list:[{\n            \"_id\":\"分类ID\",\n            \"name\":\"分类名称\",\n            \"alias\":\"角色别名\"\n        }]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/role/:id",
    "title": "获取角色详情",
    "name": "GetRoleDetail",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>角色别名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "menus",
            "description": "<p>目录列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "actions",
            "description": "<p>权限列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"获取成功\"\n    },\n    body:{\n        \"_id\":\"分类ID\",\n        \"name\":\"分类名称\",\n        \"alias\":\"角色别名\",\n        \"menus\":[],\n        \"actions\":[]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/role/",
    "title": "新增角色",
    "name": "PostRole",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>角色别名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "menus",
            "description": "<p>目录列表</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actions",
            "description": "<p>权限列表</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"添加成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/role/",
    "title": "编辑角色",
    "name": "PutRole",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>角色ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>角色别名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "menus",
            "description": "<p>目录列表</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actions",
            "description": "<p>权限列表</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"更新成功\"\n    },\n    body:{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/roleSync/",
    "title": "同步角色",
    "name": "SyncRole",
    "group": "Role",
    "permission": [
      {
        "name": "登录用户"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "成功范例",
          "content": "{\n    head:{\n        \"status\":200,\n        \"msg\":\"同步成功\"\n    },\n    body:{\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./config.js",
    "groupTitle": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "defaultValue": "application/javascript",
            "description": "<p>请求类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TYPE",
            "defaultValue": "PC",
            "description": "<p>请求客户端类型</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "API-TOKEN",
            "description": "<p>登录令牌</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "头部请求",
          "content": "\"Content-Type\": \"application/javascript\"\n\"API-TYPE\": \"PC\"\n\"API-TOKEN\": \"42cd2a667a4617bba385bfa0660f3f1c\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "101": [
          {
            "group": "101",
            "optional": false,
            "field": "InvalidParam",
            "description": "<p>错误的参数或其他信息(需返回错误信息)</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "InvalidUserInfo",
            "description": "<p>没有找到用户登录信息</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidAuth",
            "description": "<p>当前用户没有权限访问这个API</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "InvalidAPI",
            "description": "<p>不存在的API地址</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Error",
            "description": "<p>执行错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "失败范例",
          "content": "{\n    head:{\n        \"status\":403,\n        \"msg\":\"当前用户没有权限访问这个API\"\n    }\n}",
          "type": "json"
        }
      ]
    }
  }
] });
