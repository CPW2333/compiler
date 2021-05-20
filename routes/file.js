const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const {
    ErrorModel
} = require('../model/resModel')

const {
    mime
} = require('../config/mime')
const {
    authFileType
} = require('../utils/authFileType')


// 获取编译后的文件
router.get('/file/:id', async (req, res, next) => {
    const {
        id
    } = req.params

    // 获取最后一个后缀
    const splitedArr = String(id).split('.')
    if (splitedArr.length == 1) return res.json(new ErrorModel('没有文件后缀名！'))

    const postFix = splitedArr[splitedArr.length - 1]

    // 判断类型是否支持
    const LegalFileType = authFileType(postFix)
    if (!LegalFileType) return res.json(new ErrorModel('不支持该文件类型！'))

    let realpath = path.normalize(path.join(__dirname, '..', '/uploads/', id))

    // 设置返回类型
    res.set('content-type', LegalFileType)

    var stream = fs.createReadStream(realpath)
    // 判断状态
    if (stream) {
        stream.on('error', (err) => {
            // 失败设置返回类型为JSON
            res.set('content-type', mime.json)
            return res.json(new ErrorModel('资源不存在！'))
        })

        //读取文件
        stream.pipe(res, {
            end: false
        })
        stream.on('end', () => {
            res.end()
        })
    }
})

module.exports = router