/**
 *对token的生成和验证
 */

const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')
const {Exception} = require('../core/http-exception')

//生成token
async function genToken(user) {
  const token = await jwt.sign(user, SECRET, { expiresIn: `${1000 * 60 * 120}` })
  return token
}


//验证token
async function verifyToken(token) {
  let user;
  try {
    user = await jwt.verify(token, SECRET)
  } catch (error) {
    throw new Exception('登录超时! 请重新登陆', global.config.EXI)
  }
  return user
}



module.exports = {
  genToken,
  verifyToken
}
