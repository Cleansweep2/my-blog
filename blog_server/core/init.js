/**
 * 初始化界面
 */
const path = require('path')

const cors = require('koa2-cors')
const koaBody = require('koa-body')
const requireDirectory = require('require-directory')
//模板引擎
const render = require('koa-art-template')
//静态资源 304
const staticCache = require('koa-static-cache')
//静态资源
const server = require('koa-static')
//打印日志
const { logger } = require('../log')
const config = require('../config')
//全局错误处理
const { ErrorHandle} = require('./http-exception')


//将配置全部导入到全局变量
global.config = config
//将数据库模块全部引入
require('require-all')(path.resolve('./models'))

class Init {
  constructor(app) {
    //404页面初始化
    this.templateInit(app)
    //基本配置的初始化
    this.basicInit(app)
    //路由的初始化
    this.routeInit(app)
  }
  //基本的
  basicInit(app) {
    //公开的资源 404
    app.use(server(path.join(__dirname, '../views')))
    //公开的资源前端展示
    app.use(server(path.join(__dirname, '../server')))
    //一小时过期
    app.use(staticCache(path.join(__dirname, '../public')), {
      maxAge: 1000 * 60 * 60
    })
    //解决ajax跨域问题
    app.use(cors({
      credentials: true
    }))
    //解决post请求的中间件
    app.use(koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 500 * 1024 * 1024    // 设置上传文件大小最大限制，默认5M
      }
    }))
    //打印请求的日志
    app.use(logger())
    //全局处理异常的中间件
    app.use(ErrorHandle())
  }
  //模板引擎初始化
  templateInit(app) {
    render(app, {
      root: path.join(__dirname, '../views'), // 视图的位置
      extname: '.html', // 后缀名
      debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
    })
  }
  //路由的挂载
  routeInit(app) {
    //导入后台路由
    requireDirectory(module, path.join(process.cwd(), './routes/admin'), { visit: whenModuleLoad })
    //导入前台路由
    requireDirectory(module, path.join(process.cwd(), './routes/web'), { visit: whenModuleLoad })
    //导入公共的路由
    requireDirectory(module, path.join(process.cwd(), './routes/comment'), { visit: whenModuleLoad })
    //路由注册
    function whenModuleLoad(obj) {
      if (obj instanceof require('koa-router')) {
        app.use(obj.routes())
      }
    }
    //404 页面
    app.use(async (ctx) => {
      await ctx.render('404', {
        path: ctx.href
      })
    })
  }
}
module.exports = Init



