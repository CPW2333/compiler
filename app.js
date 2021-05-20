// 处理路径不存在 404
const createError = require('http-errors');
const express = require('express');
// 传输压缩
const compression = require('compression')
const path = require('path');
// 处理日志相关的
const logger = require('morgan');
// 写日志需要
const fs = require('fs')

// 引入路由文件
const getFileRouter = require('./routes/file');
const golangCompilerRouter = require('./routes/golangCompile');
const javaCompilerRouter = require('./routes/javaCompiler');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// 设置跨域和相应数据格式
app.all('/api/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, ConnectId ')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.header('X-Powered-By', 'Guess it for yourself')
  res.header('Content-Type', 'application/json;charset=utf-8')

  if (req.method == 'OPTIONS') res.json(200)
  /*让options请求快速返回*/
  else
    next()
})

// 写日志
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  if (ENV !== 'test') {
    // 开发环境
    app.use(logger('dev', {
      // 默认的stream
      stream: process.stdout
    }));
  } else {
    // 测试环境
    const logFileName = path.join(__dirname, 'logs', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
      flags: 'a'
    })
    app.use(logger('combined', {
      stream: writeStream
    }));
  }
} else {
  // 生产环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
// 开启传输压缩
app.use(compression());
// 处理josn格式的postData请求 可轻松获取body信息
app.use(express.json());
// 设置postData数据可以兼容其他格式
app.use(express.urlencoded({
  extended: false
}));

// 静态资源管理
app.use(express.static(path.join(__dirname, 'public')));


// 准备就绪 处理路由
app.use('/api/compiler', getFileRouter);
app.use('/api/compiler', golangCompilerRouter);
app.use('/api/compiler', javaCompilerRouter);

// 页面未找到 404
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  res.header('Content-Type', 'text/html;charset=utf-8')
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;