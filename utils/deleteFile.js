const path = require('path')
const fs = require('fs')

//删除本地文件
const deleteFile = (fileName) => {
    try {
        // 删除本地荣誉图片
        fs.unlinkSync(path.normalize(path.join(__dirname, '..', '/uploads/', fileName)))
        console.log(fileName + ' 文件删除成功！')
        return

    } catch (error) {
        console.error(fileName + ' 文件已经不存在！')
    }
}

module.exports = {
    deleteFile
}