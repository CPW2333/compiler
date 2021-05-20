const multer = require('multer')
const {
    authFileType
} = require('../utils/authFileType')

// 单文件 req.file 是一个`field`的对象  里面包含文件的信息
const uploadSingle = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            var changedName = /* parseInt(new Date().getTime()) + '_' +  */ file.originalname;
            cb(null, changedName);
        },
    }),
    fileFilter: (req, file, cb) => {
        // 获取最后一个后缀
        const splitedArr = String(file.originalname).split('.')
        if (splitedArr.length == 1) {
            return cb({
                desc: '不支持没有后缀名的文件类型！',
                file
            }, false)
        }
        const postFix = splitedArr[splitedArr.length - 1]
        if (postFix != 'java') {
            return cb({
                desc: `暂时不支持 .${postFix} 的文件编译，敬请期待！`,
                file
            }, false)
        }

        // 验证后缀是否合法
        const res = authFileType(postFix)
        if (!res) {
            return cb({
                desc: `不支持 .${postFix} 的文件类型！`,
                file
            }, false)
        }

        // 接受这个文件，使用`true`，第一个参数只能写 null
        return cb(null, true)
    },
    limits: {
        // 允许的最多字段
        fields: 20,
    },
}).single('file')

module.exports = {
    uploadSingle,
}