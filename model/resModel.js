class BaseModel {
    // data是对象，message是字符串
    constructor(data, message) {
        this.meta = {}
        // 第一个是字符串 第二个没传 要兼容
        if (typeof data === 'string') {
            this.meta.msg = data
            data = null
            message = null
        }

        if (data) {
            this.data = data
        }

        if (message) {
            this.meta.msg = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.meta.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.meta.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
}