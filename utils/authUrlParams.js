/* 根据url 的 某些参数字段 是否是数字 */
const authUrlParams = field => {
    // 匹配数字正则表达式
    const rg = /^-?\d+$/
    if (!rg.test(field)) {
        return false
    }
    return true
}

module.exports = {
    authUrlParams
}