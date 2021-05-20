const path = require('path')
const fs = require('fs')
const cmd = require('node-cmd');

const {
    // SuccessModel,
    ErrorModel
} = require('../model/resModel')

const {
    mime
} = require('../config/mime')
const {
    authFileType
} = require('../utils/authFileType')


// 编译java文件
const compile = async (fileName) => {
    let realFilePath = path.normalize(path.join(__dirname, '..', '/uploads/', fileName))
    cmd.runSync('javac ' + realFilePath);

    // 获取前缀
    const preFix = String(fileName).split('.')[0]

    fs.readFile(path.normalize(path.join(__dirname, '..', '/uploads/', preFix + '.class')), 'utf8', (err, doc) => {
        if (err)
            return false

        if (doc)
            return true
        else
            return false
    })
    return true

}


module.exports = {
    compile,
}