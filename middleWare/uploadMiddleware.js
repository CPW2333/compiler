const {
    ErrorModel
} = require('../model/resModel')
const multer = require('multer')
// 文件上传中间件
const {
    uploadSingle,
} = require('../config/multer')

// 单文件
const uploadSingleMiddleware = async (req, res, next) => {

    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // 发生错误
            return res.json(new ErrorModel(err, `${err.message} ,字段设置错误或超出个数！`))
        } else if (err) {
            // 发生错误
            return res.json(new ErrorModel(err, '上传失败！'))
        }
        // 一切都好
        next()
    })
}

module.exports = {
    uploadSingleMiddleware,
}