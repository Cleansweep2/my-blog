/**
 * 全局抛出错误的模块
 */

//继承自node的 Error模块
class Exception extends Error {
  constructor(message, errCode) {
    super()
    this.message = message
    this.errCode = errCode || 11  //请求的语法错误
  }
}

//错误处理中间件 只要出现错误 就会捕获 需要之后的每个中间件都需要用到 async await 否则有可能捕获不到
function ErrorHandle() {
  return async (ctx, next) => {
    ctx.set({ server: 'CHEN' })
    try {
      await next()
    } catch (error) {
      if (error instanceof Error) {
        ctx.body = {
          message: error.message,
          errCode: error.errCode || 1,
          path: ctx.path
        }
      }
    }
  }
}


module.exports = {
  ErrorHandle,
  Exception
}