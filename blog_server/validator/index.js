/**
 * 数据的验证
 */
const validator = require('validator')

const { Exception } = require('../http-exception')


class Validate {

  isLength(data, mes, options = {}) {
    if (!validator.isByteLength(data, options)) {
      throw new Exception(mes)
    } else {
      return this
    }
  }

  isEmpty(data, mes) {
    if (validator.isEmpty(data, { ignore_whitespace: true })) {
      throw new Exception(mes)
    } else {
      return this
    }
  }

  isJWT(data, mes, options = {}) {
    if (!validator.isJWT(data, options = {})) {
      throw new Exception(mes)
    } else {
      return this
    }
  }

  isInt(data, mes, options = {}) {
    let num;
    if (!validator.isInt(data, options = {})) {
      throw new Exception(mes)
      if (/[a-z]/i.test(data)) {
        throw new Exception(mes)
      }
      if (/\s*/.test(data)) {
        num = data.trim()
      }
      this[data] = validator.toInt(num)
      return this
    } else {
      this[data] = data
      return this
    }
  }

  isFloat(data, mes, options = {}) {
    let num;
    if (!validator.toFloat(data, options = {})) {
      if (/[a-z]/i.test(data)) {
        throw new Exception(mes)
      }
      if (/\s*/.test(data)) {
        num = data.trim()
      }
      this[data] = validator.toFloat(num)
      return this
    } else {
      this[data] = data
      return this
    }
  }

  isIn(str, mes, arr = []) {
    if (!validator.isIn(str, arr)) {
      throw new Exception(mes)
    } else {
      return this
    }
  }

  get(data) {
    return this[data]
  }
}

module.exports = Validate
