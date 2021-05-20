const {
    ErrorModel
} = require('../model/resModel')
const {
    deleteFile
} = require('../utils/deleteFile')

// 检查是否携带参数
const checkParams = async (req, res, next) => {
    // 检查有无版本号
    let {
        version
    } = req.body

    if (!version) {
        res.json(new ErrorModel('请输入相应版本号！'))
        await deleteFile(req.file.filename)
        return
    }

    switch (version) {
        case '8':
            break
        case '9':
            break
        case '10':
            break
        case '11':
            break
        case '12':
            break
        case '13':
            break
        case '14':
            break
        default:
            res.json(new ErrorModel('目前仅支持 8~14 的版本！'))
            await deleteFile(req.file.filename)
            return
    }
    // 一切都好
    next()

}


module.exports = {
    checkParams,
}