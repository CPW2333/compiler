const express = require('express')
const router = express.Router()
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 编译文件
const {
  compile
} = require('../controller/javaCompiler')

// 版本号检查中间件
const {
  checkParams,
} = require('../middleWare/checkParams')
// 文件上传中间件
const {
  uploadSingleMiddleware,
} = require('../middleWare/uploadMiddleware')
// 删除文件
const {
  deleteFile
} = require('../utils/deleteFile')

// 编译文件
router.post('/java', uploadSingleMiddleware, checkParams, async (req, res, next) => {
  try {
    const file = req.file
    if (!file) return res.json(new ErrorModel('请上传源码文件！'))

    // 转给controller处理编译过程
    const result = await compile(req.file.filename)
    if (!result) return res.json(new ErrorModel('文件编译失败！'))

    // 获取前缀
    const preFix = String(req.file.filename).split('.')[0]
    res.json(new SuccessModel({
      '编译后的文件下载地址': 'http://127.0.0.1:7329/api/compiler/file/' + preFix + '.class'
    }, '文件编译完成！'))

    await deleteFile(req.file.filename)
    return
  } catch (error) {
    return res.json(new ErrorModel('请上传源码文件！！！'))
  }
})


module.exports = router