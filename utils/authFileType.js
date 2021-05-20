const {
    mime
} = require('../config/mime')


// 验证文件类型是否被支持
const authFileType = (postFix) => {
    for (let key in mime) {
        if (key == postFix) {
            return mime[key]
        }
    }
    return false
}

module.exports = {
    authFileType
}