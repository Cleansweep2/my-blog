/**
 * 应用入口
 */
const koa = require('koa')

const app = new koa()

//连接数据库
const db_connect = require('./core/db')
//导入初始数据
const Init = require('./core/init')

//连接数据库
db_connect()
//初始化数据
new Init(app)


app.listen(global.config.PORT || 3001  , () => {
  //打印服务器开启日志
  require('./log').serverLogger()()

})





