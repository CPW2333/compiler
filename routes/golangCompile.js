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

// 文件上传中间件
const {
  uploadSingleMiddleware,
} = require('../middleWare/uploadMiddleware')
// 删除文件
const {
  deleteFile
} = require('../utils/deleteFile')

// 编译文件
router.post('/golang', uploadSingleMiddleware, async (req, res, next) => {
  try {
    const file = req.file
    if (!file) return res.json(new ErrorModel('请上传源码文件！'))

    // 转给controller处理编译过程
    // const result = await compile()
    // if (!result) return res.json(new ErrorModel('文件编译失败！'))

    res.json(new SuccessModel('目前仅支持编译java源文件，敬请期待！'))

    await deleteFile(req.file.filename)
    return
  } catch (error) {
    return res.json(new ErrorModel('请上传源码文件！'))
  }
})


module.exports = router