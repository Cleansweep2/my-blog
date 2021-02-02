const koaRouter = require('koa-router')


const router = new koaRouter()

router.get(/\/.*/,(ctx)=>{
  ctx.redirect('/web')
})

module.exports = router