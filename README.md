# fiora-backend

Fiora聊天室后端

本仓库已停止更新, 请移步 `https://github.com/yinxin630/fiora`

## 技术栈

* 语言: JavaScript ES6, Node.js
* 框架: Sails
* 数据库: MongoDB
* 工具:   
    1. bcrypt-nodejs
    2. co
    3. node-qiniu
    4. node-base64-image
    
## 安装

本项目依赖[node.js](http://npm.taobao.org/mirrors/node) v5.4 以上环境和[MongoDB](https://www.mongodb.org/downloads#production)数据库, 请下载与您的系统相对应的版本安装.  

1. 克隆项目 `git clone https://github.com/yinxin630/fiora-backend`
2. 进入项目目录 `cd fiora-backend`
3. 安装依赖库 `npm install`
4. 在`config/commections.js`中配置mongo数据库名, 在`config/env/production.js | development.js`中配置端口号和要使用的数据库连接
5. 运行项目 `npm run dev` or `npm run prod`