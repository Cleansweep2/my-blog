/**
 * 后台crud
 */
const koaRouter = require('koa-router')
const mongoose = require('mongoose')

//转化类名
const inflection = require('inflection')
//
const { verifyToken } = require('../../Edittoken')
//错误抛出
const { Exception } = require('../../core/http-exception')

//路由前缀
const router = new koaRouter({
  prefix: '/admin/crud',
})
/**
 * 任何后台的crud都要经过这歌路由
 */
router.use('/:model', async (ctx, next) => {
  //动态路由参数
  const m = ctx.params.model
  const { token } = ctx.headers
  //如果没有登陆
  if (!token) {
    throw new Exception('请先登陆', global.config.NOTUSER)
  }
  const user = await verifyToken(token)
  if(!user)
  {
    throw new Exception('请重新登陆', global.config.NOTUSER)
  }
  //把实例化的数据库传给下一个中间件
  ctx.request.model = mongoose.model(inflection.capitalize(m))
  //加await就可以了 不加await 有的错误捕获不了
  await next()
})

/**
 * 增加数据
 */
router.post('/:model/add', async (ctx, next) => {
  const data = ctx.request.body
  const model = ctx.request.model
  await new model(data).save()
  ctx.body = {
    message: "保存成功",
    errCode: global.config.SUCCESS
  }
})
/**
 * 删除数据
 */
router.delete('/:model/delete/:id', async (ctx, next) => {
  const { id } = ctx.params
  const model = ctx.request.model
  await model.findByIdAndDelete(id)
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: '删除成功'
  }
})
/**
 * 修改数据
 */
router.put('/:model/update/:id', async (ctx, next) => {
  const data = ctx.request.body
  const { id } = ctx.params
  const model = ctx.request.model
  await model.findByIdAndUpdate(id, data)
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: '更新成功'
  }
})
/**
 * 获取多个数据
 */
router.get('/:model/get', async (ctx, next) => {
  const m = ctx.params.model
  const model = ctx.request.model
  let data
  //如果是分类
  if (m === 'category') {
    data = await model.find({}).populate('parent')
    //如果是文章
  } else if (m === 'article') {
    data = await model.find({}).populate('category tags')
    //如果是评论页的话
  } else if (m === 'comment') {
    data = await model.find({ to: { $exists: false } }, { _v: 0 })
      .populate('publisher')
      .populate({
        path: 'froms',
        //查询子评论的user
        populate: {
          path: 'publisher froms',
          populate: {
            //查询子子评论的user
            path: 'publisher'
          }
        }
      }).sort({ createdAt: -1 })
  }
  //如果是个人信息 或者 个人日记日记
  else if (m === 'info' || m === 'diary') {
    data = await model.find({})
      .populate('author')
      .sort({ createdAt: -1 })
    //如果是图片 或者是 图片上传
  } else if (m === 'image' || m === 'upload') {
    data = await model.find({})
  }
  //其他
  else {
    data = await model
      .find({})
      .populate('category')
  }
  const total = data.length
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: '请求成功',
    data,
    total
  }
})

/**
 * 获取单个数据
 */
router.get('/:model/get_one/:id', async (ctx, next) => {
  const { id } = ctx.params
  const m = ctx.params.model
  const model = ctx.request.model
  let data
  if (m === 'article') {
    data = await model
      .findById(id,)
      .populate('category')
  } else {
    data = await model.findById(id,)
  }
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: '获取成功',
    data,
  }
})
/**
 * 按分类,作者,获取文章列表
 */
router.get('/:model/:type/:name/get', async (ctx, next) => {
  const { name, type } = ctx.params
  const model = ctx.request.model
  let data;
  data = await model.find({ [type]: name })
    .populate('category')
    .populate('tags')
  if (type === 'author' || type === 'category') {
    data = await model
      .find({ [type]: name })
      .populate('category')
      .populate('tags')
  } else if (type === 'title') {
    const regex = new RegExp(name, 'i')
    data = await model
      .find({ [type]: { $regex: regex } })
      .populate('category')
      .populate('tags')
  }
  const total = data.length
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: '请求成功',
    data,
    total
  }
})






module.exports = router