/**
 * 日志打印模块
 */
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')

function logger(){
  return async (ctx,next) =>{
    fs.appendFileSync(path.join(__dirname,'./koa.log'),
    'method::::'+ctx.method + '    ip::::'+ ctx.ip + '   href::::' +ctx.href +
     '   request_time=='+ dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')+'\r')
     await  next()
  }
}

/**
 * 服务开启日志模块
 */
function serverLogger(){
  return () =>{
    fs.appendFileSync(path.join(__dirname,'./server.log'),
    dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '-----------koa服务器开启了\n'
    )
  }
}

module.exports = {
  logger,
  serverLogger
}

