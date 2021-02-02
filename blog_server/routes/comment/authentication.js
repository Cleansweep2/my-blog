/**
 * 登录注册及修改密码等操作
 */
const koaRouter = require('koa-router')
const bcrypt = require('bcryptjs')


const router = new koaRouter()

const User = require('../../models/user')
//抛出异常
const { Exception } = require('../../core/http-exception')
//生成token 和 验证token是否过期
const { genToken, verifyToken } = require('../../Edittoken')

/**
 * 通过注册的方式
 */

//注册界面
router.post('/:type/user/register', async (ctx, next) => {
  const { type } = ctx.params
  const data = ctx.request.body
  const { userName } = data
  const user = await User.findOne({ userName })
  if (user) {
    throw new Exception('该用户已存在', global.config.FAIL)
  }
  const data1 = await new User(data).save()
  if (type === 'web') {
    delete data1.password
    const token = await genToken(data)
    ctx.body = {
      token,
      user: data1,
      message: '注册成功',
      errCode: global.config.SUCCESS
    }
  } else if (type === 'admin') {
    ctx.body = {
      message: '注册成功',
      errCode: global.config.SUCCESS
    }
  }
})

//用户登录
router.post('/:type/user/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const { type } = ctx.params
  //这是用户名验证
  const user = await User.findOne({ userName }).lean()
  //这是邮箱验证
  const user1 = await User.findOne({ email: userName }).lean()
  if (!user && !user1) {
    throw new Exception('没有此用户', global.config.NOTUSER)
  }
  const isTrue = bcrypt.compareSync(password, user.password)
  if (!isTrue) {
    throw new Exception('密码不正确', global.config.NOTUSER)
  }
  if (type === 'admin' && !user.isAdmin) {
    throw new Exception(`亲! ${user.userName} 不是管理员`, global.config.NOTUSER)
  }
  delete user.password
  const token = await genToken(user)
  ctx.body = {
    token,
    user,
    message: '登陆成功',
    errCode: global.config.SUCCESS
  }
})

/**
 * 通过第三方验证的方式 等待实现
 */


//用户验证
router.post('/:type/user/verify', async (ctx, next) => {
  const { token } = ctx.headers
  if (!token) {
    throw new Exception('请先登录', global.config.NOTUSER)
  }
  const user = await verifyToken(token)
  //如果token失效请重新登陆
  if(!user)
  {
    throw new Exception('请重新登录', global.config.NOTUSER)
  }
  ctx.body = {
    message: '登陆成功',
    errCode: global.config.SUCCESS,
    user
  }
})


//管理员修改密码
router.put('/:type/user/edit', async (ctx, body) => {
  const { newPwd, oldPwd, username } = ctx.request.body
  const user = await User.findOne({ newPwd, oldPwd })
  if (!user) {
    throw new Exception('用户或密码错误', global.config.FAIL)
  }
  await User.updateOne({ username }, { password: newPwd })
  ctx.body = {
    message: '修改成功',
    errCode: global.config.SUCCESS
  }
})


module.exports = router