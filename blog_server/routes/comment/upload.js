/**
 * 上传路由
 */
const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')




router.post('/admin/upload',async (ctx,next)=>{
  const file = ctx.request.files.avatar; // 获取上传文件
  //创建可读流
  const rs = fs.createReadStream(file.path)
  //创建可写流
  const ws = fs.createWriteStream(path.join(__dirname,'../../public/upload/' + file.name))
  //写入
  rs.pipe(ws)
  const filename = file.name
  const imgUrl = "http://127.0.0.1:3001/upload/"+filename
  const res = await mongoose.model('Upload')({imgUrl,filename,}).save()
  ctx.body = {
    errCode:global.config.SUCCESS,
    message:"上传成功",
    imgUrl,
  }
})

//阿里oss 待实现

//上传图片的删除 删除本地图片 及 数据库的图片信息
router.delete('/admin/img/:id/:filename/delete',async (ctx)=>{
  const {id,filename} = ctx.params
  fs.unlinkSync(path.join(path.resolve(),`/public/upload/${filename}`))
  await mongoose.model('Upload').findByIdAndDelete(id)
  ctx.body = {
    errCode:global.config.SUCCESS,
    message:"删除成功",
  }
})

module.exports = router

