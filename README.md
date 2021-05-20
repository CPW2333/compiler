##### JAVA、GOLANG编译器API文档
****

###### 项目运行需要的前提条件：
- `Node.js `已经安装
- `JAVA ` jdk已经安装并配置好相关环境变量  


###### 运行此项目
```js
    // 1. 进入项目文件夹根目录
    // 2. 命令行输入：
        npm install
        npm run dev // npm run prd // prd是生产环境
    // 3. 接口测试软件测试本项目，如postman
```
****


##### API 接口使用说明

##### 1.  *API  接口说明*

- 接口基准地址：
  - `http://127.0.0.1:7329/api/compiler`
- 本接口已开启 **CORS 跨域**支持
- 非文件数据返回格式统一使用 JSON

###### 1.1 本API支持的请求方法

- OPTIONS：获取信息，关于文件的哪些属性是客户端可以改变的。
- GET（SELECT）：从服务器取出文件（一项或多项）。
- POST（CREATE）：在服务器新建一个文件。
- PUT（UPDATE）：在服务器更新文件（客户端提供改变后的多个文件属性）。
- PATCH（UPDATE）：在服务器更新文件（客户端提供需要改变的一个文件属性）。
- DELETE（DELETE）：从服务器删除文件。

###### 1.2 本接口返回状态说明
| *状态码* | *含义* |  *说明*  |
| :------: | :----: | :------: |
|    0     |   OK   | 请求成功 |
|    -1    |   NO   | 请求失败 |

###### 1.3 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的文件不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 服务器内部错误                                      |
****



#### 2. JAVA文件编译接口

##### 2.1 上传要编译的JAVA文件

- 请求路径：/java
- 请求方法：post
- 请求参数：见下表
  - *写在请求体 `req.body` 中*

| 参数名  | 参数说明       | 备注 |
| ------- | -------------- | ---- |
| file    | 上传文件的字段 | 必填 |
| version | 版本号         | 必填 |


- 响应数据示例
```json
{
    "meta": {
        "msg": "文件编译完成！",
        "errno": 0
    },
    "data": {
        "编译后的文件下载地址": "http://127.0.0.1:7329/api/compiler/file/1621490201651_Hello.class"
    }
}
```


#### 3. GOLANG文件编译接口

##### 3.1 上传要编译的GOLANG文件

- 请求路径：/golang
- 请求方法：post
- 请求参数：见下表
  - *写在请求体 `req.body` 中*

| 参数名  | 参数说明       | 备注 |
| ------- | -------------- | ---- |
| file    | 上传文件的字段 | 必填 |
| version | 版本号         | 必填 |

- 响应数据示例
```json
{
    "meta": {
        "msg": "上传失败！",
        "errno": -1
    },
    "data": {
        "desc": "暂时不支持 .go 的文件编译，敬请期待！",
        "file": {
            "fieldname": "file",
            "originalname": "Hello.go",
            "encoding": "7bit",
            "mimetype": "application/octet-stream"
        },
        "storageErrors": []
    }
}
```

#### 4. 关于日志

- 日志切分脚本文件写在 `/utils/logSegmentation.bash`
- 利用Linux自带的定时任务或者其他类似的软件，把代码复制粘贴即可

