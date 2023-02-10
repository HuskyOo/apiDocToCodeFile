module.exports = {
  "swagger": "2.0",
  "info": {
      "description": "管理后台接口文档",
      "version": "1.0",
      "title": "德锋创享-溯源优才API文档",
      "termsOfService": "https://www.defshare.com",
      "contact": {
          "name": "xianci",
          "url": "https://www.defshare.com",
          "email": "xianci@aliyun.com"
      }
  },
  "host": "office.xianci.info:18085",
  "basePath": "/admin",
  "tags": [
      {
          "name": "open-controller",
          "x-order": "2147483647"
      },
      {
          "name": "公共api",
          "x-order": "2147483647"
      },
      {
          "name": "账号管理",
          "x-order": "2147483647"
      }
  ],
  "paths": {
      "/commonLogin/login": {
          "post": {
              "tags": [
                  "公共api"
              ],
              "summary": "登录",
              "description": "登录",
              "operationId": "doLoginUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "param",
                      "description": "param",
                      "required": true,
                      "schema": {
                          "originalRef": "JwtLoginParam",
                          "$ref": "#/definitions/JwtLoginParam"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/commonLogin/upload": {
          "post": {
              "tags": [
                  "公共api"
              ],
              "summary": "文件上传",
              "description": "文件上传",
              "operationId": "uploadUsingPOST",
              "consumes": [
                  "multipart/form-data"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "name": "multipartFile",
                      "in": "formData",
                      "required": false,
                      "type": "file"
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/add": {
          "post": {
              "tags": [
                  "账号管理"
              ],
              "summary": "新增账号",
              "description": "新增账号",
              "operationId": "addUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "staffRequest",
                      "description": "staffRequest",
                      "required": true,
                      "schema": {
                          "originalRef": "Staff请求接口对象",
                          "$ref": "#/definitions/Staff请求接口对象"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/delete": {
          "delete": {
              "tags": [
                  "账号管理"
              ],
              "summary": "删除",
              "description": "删除",
              "operationId": "deleteUsingDELETE",
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "name": "id",
                      "in": "query",
                      "description": "id",
                      "required": false,
                      "type": "string"
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "204": {
                      "description": "No Content"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/getAddType": {
          "get": {
              "tags": [
                  "账号管理"
              ],
              "summary": "获取可添加账号类型",
              "description": "获取可添加账号类型",
              "operationId": "getAddTypeUsingGET",
              "produces": [
                  "*/*"
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse«List«string»»",
                          "$ref": "#/definitions/StatusResponse«List«string»»"
                      }
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/info": {
          "get": {
              "tags": [
                  "账号管理"
              ],
              "summary": "详情",
              "description": "详情",
              "operationId": "infoUsingGET",
              "produces": [
                  "*/*"
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/list": {
          "post": {
              "tags": [
                  "账号管理"
              ],
              "summary": "账号列表",
              "description": "账号列表",
              "operationId": "listUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "customPageRequest",
                      "description": "customPageRequest",
                      "required": true,
                      "schema": {
                          "originalRef": "CustomPageRequest",
                          "$ref": "#/definitions/CustomPageRequest"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/reset": {
          "put": {
              "tags": [
                  "账号管理"
              ],
              "summary": "重置密码",
              "description": "重置密码",
              "operationId": "resetUsingPUT",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "staffRestRequest",
                      "description": "staffRestRequest",
                      "required": true,
                      "schema": {
                          "originalRef": "Staff重置密码",
                          "$ref": "#/definitions/Staff重置密码"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/staff/update": {
          "put": {
              "tags": [
                  "账号管理"
              ],
              "summary": "修改",
              "description": "修改",
              "operationId": "updateUsingPUT",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "staffRequest",
                      "description": "staffRequest",
                      "required": true,
                      "schema": {
                          "originalRef": "Staff修改请求接口对象",
                          "$ref": "#/definitions/Staff修改请求接口对象"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/wechat/open/wx/config": {
          "post": {
              "tags": [
                  "open-controller"
              ],
              "summary": "获取微信配置信息",
              "description": "获取微信配置信息",
              "operationId": "getWeixinConfigUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "body",
                      "name": "vo",
                      "description": "vo",
                      "required": true,
                      "schema": {
                          "originalRef": "StringFieldVo",
                          "$ref": "#/definitions/StringFieldVo"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/wechat/open/wx/get": {
          "post": {
              "tags": [
                  "open-controller"
              ],
              "summary": "获取微信openId",
              "description": "获取微信openId",
              "operationId": "getWXOpenIdUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "header",
                      "name": "Authorization",
                      "description": "Authorization",
                      "required": true
                  },
                  {
                      "in": "header",
                      "name": "Content-Type",
                      "description": "Content-Type",
                      "required": true
                  },
                  {
                      "in": "body",
                      "name": "vo",
                      "description": "vo",
                      "required": true,
                      "schema": {
                          "originalRef": "StringFieldVo",
                          "$ref": "#/definitions/StringFieldVo"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      },
      "/wechat/open/wx/info": {
          "post": {
              "tags": [
                  "open-controller"
              ],
              "summary": "获取微信用户信息",
              "description": "获取微信用户信息",
              "operationId": "getWXInfoUsingPOST",
              "consumes": [
                  "application/json"
              ],
              "produces": [
                  "*/*"
              ],
              "parameters": [
                  {
                      "in": "header",
                      "name": "Authorization",
                      "description": "Authorization",
                      "required": true
                  },
                  {
                      "in": "header",
                      "name": "Content-Type",
                      "description": "Content-Type",
                      "required": true
                  },
                  {
                      "in": "body",
                      "name": "vo",
                      "description": "vo",
                      "required": true,
                      "schema": {
                          "originalRef": "登陆请求类",
                          "$ref": "#/definitions/登陆请求类"
                      }
                  }
              ],
              "responses": {
                  "200": {
                      "description": "OK",
                      "schema": {
                          "originalRef": "StatusResponse",
                          "$ref": "#/definitions/StatusResponse"
                      }
                  },
                  "201": {
                      "description": "Created"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Forbidden"
                  },
                  "404": {
                      "description": "Not Found"
                  }
              },
              "x-order": "2147483647"
          }
      }
  },
  "definitions": {
      "CustomPageRequest": {
          "type": "object",
          "properties": {
              "countId": {
                  "type": "string"
              },
              "current": {
                  "type": "integer",
                  "format": "int64"
              },
              "end": {
                  "type": "integer",
                  "format": "int64",
                  "description": "时间止"
              },
              "extra": {
                  "type": "object",
                  "description": "额外信息 map {a:b,c:d}"
              },
              "isShow": {
                  "type": "boolean",
                  "description": "是否显示"
              },
              "locked": {
                  "type": "boolean",
                  "description": "是否锁定"
              },
              "maxLimit": {
                  "type": "integer",
                  "format": "int64"
              },
              "optimizeCountSql": {
                  "type": "boolean"
              },
              "optimizeJoinOfCountSql": {
                  "type": "boolean"
              },
              "orders": {
                  "type": "array",
                  "items": {
                      "originalRef": "OrderItem",
                      "$ref": "#/definitions/OrderItem"
                  }
              },
              "pages": {
                  "type": "integer",
                  "format": "int64"
              },
              "queryId": {
                  "type": "string",
                  "description": "queryId"
              },
              "records": {
                  "type": "array",
                  "items": {
                      "type": "object"
                  }
              },
              "searchCount": {
                  "type": "boolean"
              },
              "size": {
                  "type": "integer",
                  "format": "int64"
              },
              "start": {
                  "type": "integer",
                  "format": "int64",
                  "description": "时间起"
              },
              "title": {
                  "type": "string",
                  "description": "模糊搜索"
              },
              "total": {
                  "type": "integer",
                  "format": "int64"
              },
              "type": {
                  "type": "string",
                  "description": "类型"
              }
          },
          "title": "CustomPageRequest"
      },
      "JwtLoginParam": {
          "type": "object",
          "required": [
              "password",
              "staffType",
              "username"
          ],
          "properties": {
              "code": {
                  "type": "string",
                  "description": "验证码"
              },
              "password": {
                  "type": "string",
                  "description": "密码"
              },
              "staffType": {
                  "type": "string",
                  "description": "客户端类型: CONSUMER c端, BUSINESS b端, SYSTEM 管理端平台账号, SALE 销售",
                  "enum": [
                      "BUSINESS",
                      "CONSUMER",
                      "SALE",
                      "SYSTEM"
                  ]
              },
              "username": {
                  "type": "string",
                  "description": "用户名"
              }
          },
          "title": "JwtLoginParam"
      },
      "OrderItem": {
          "type": "object",
          "properties": {
              "asc": {
                  "type": "boolean"
              },
              "column": {
                  "type": "string"
              }
          },
          "title": "OrderItem"
      },
      "Staff修改请求接口对象": {
          "type": "object",
          "properties": {
              "avatar": {
                  "type": "string",
                  "description": "头像"
              },
              "email": {
                  "type": "string",
                  "description": "邮箱"
              },
              "id": {
                  "type": "string"
              },
              "ids": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "name": {
                  "type": "string",
                  "description": "姓名"
              },
              "password": {
                  "type": "string",
                  "description": "密码"
              },
              "sex": {
                  "type": "integer",
                  "format": "int32",
                  "description": "性别性别只能是 -1 女 和1 男"
              },
              "status": {
                  "type": "string",
                  "description": "用户状态 1 在职 0 离职"
              },
              "username": {
                  "type": "string",
                  "description": "角色名称"
              }
          },
          "title": "Staff修改请求接口对象",
          "description": "Staff修改请求接口对象"
      },
      "Staff请求接口对象": {
          "type": "object",
          "properties": {
              "avatar": {
                  "type": "string",
                  "description": "头像"
              },
              "businessInfo": {
                  "description": "机构信息",
                  "originalRef": "business_info",
                  "$ref": "#/definitions/business_info"
              },
              "email": {
                  "type": "string",
                  "description": "邮箱"
              },
              "id": {
                  "type": "string"
              },
              "ids": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "name": {
                  "type": "string",
                  "description": "姓名"
              },
              "password": {
                  "type": "string",
                  "description": "密码"
              },
              "secondaryType": {
                  "type": "string",
                  "description": "账号二级类型:ACADEMIC_EDUCATION 学历教育, NON_ACADEMIC_EDUCATION 非学历教育, EMPLOYER 用人单位",
                  "enum": [
                      "ACADEMIC_EDUCATION",
                      "EMPLOYER",
                      "NON_ACADEMIC_EDUCATION",
                      "SALE"
                  ]
              },
              "sex": {
                  "type": "integer",
                  "format": "int32",
                  "description": "性别性别只能是 -1 女 和1 男"
              },
              "status": {
                  "type": "string",
                  "description": "用户状态 1 在职 0 离职"
              },
              "username": {
                  "type": "string",
                  "description": "用户名名称",
                  "minLength": 6,
                  "maxLength": 2147483647
              }
          },
          "title": "Staff请求接口对象",
          "description": "账号请求接口对象"
      },
      "Staff重置密码": {
          "type": "object",
          "required": [
              "id"
          ],
          "properties": {
              "id": {
                  "type": "string"
              },
              "password": {
                  "type": "string",
                  "description": "密码"
              }
          },
          "title": "Staff重置密码",
          "description": "Staff重置密码"
      },
      "StatusResponse": {
          "type": "object",
          "properties": {
              "c": {
                  "type": "integer",
                  "format": "int32"
              },
              "d": {
                  "type": "object"
              },
              "m": {
                  "type": "string"
              }
          },
          "title": "StatusResponse"
      },
      "StatusResponse«List«string»»": {
          "type": "object",
          "properties": {
              "c": {
                  "type": "integer",
                  "format": "int32"
              },
              "d": {
                  "type": "array",
                  "items": {
                      "type": "string",
                      "enum": [
                          "ACADEMIC_EDUCATION",
                          "EMPLOYER",
                          "NON_ACADEMIC_EDUCATION",
                          "SALE"
                      ]
                  }
              },
              "m": {
                  "type": "string"
              }
          },
          "title": "StatusResponse«List«string»»"
      },
      "StringFieldVo": {
          "type": "object",
          "properties": {
              "field": {
                  "type": "string",
                  "description": "必填"
              }
          },
          "title": "StringFieldVo"
      },
      "business_info": {
          "type": "object",
          "properties": {
              "createDate": {
                  "type": "integer",
                  "format": "int64"
              },
              "id": {
                  "type": "string"
              },
              "lastUpdateDate": {
                  "type": "integer",
                  "format": "int64"
              },
              "name": {
                  "type": "string",
                  "description": "机构名称"
              },
              "phone": {
                  "type": "string",
                  "description": "联系电话(勘误)"
              },
              "type": {
                  "type": "string",
                  "description": "机构类别:ACADEMIC_EDUCATION 学历教育, NON_ACADEMIC_EDUCATION 非学历教育, EMPLOYER 用人单位",
                  "enum": [
                      "ACADEMIC_EDUCATION",
                      "EMPLOYER",
                      "NON_ACADEMIC_EDUCATION",
                      "SALE"
                  ]
              },
              "unifiedSocialCreditCode": {
                  "type": "string",
                  "description": "统一社会信用代码"
              },
              "version": {
                  "type": "integer",
                  "format": "int64"
              }
          },
          "title": "business_info"
      },
      "登陆请求类": {
          "type": "object",
          "properties": {
              "access_token": {
                  "type": "object",
                  "description": "access_token"
              },
              "openid": {
                  "type": "object",
                  "description": "openid"
              }
          },
          "title": "登陆请求类"
      }
  }
}