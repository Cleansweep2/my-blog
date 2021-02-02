/*
*图片的上传
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    //图片路径
    imgUrl:{type:String},
    //图片名称 便于删除图片
    filename:{type:String}
  },
  {
    timestamps:true,
    collection:'uploads',
    toJSON:{virtuals:true}
  })

schema.virtual('articleList',{
  ref:'Article',
  localField:'_id',
  foreignField:'uploads',
  justOne:false
})

module.exports = mongoose.model('Upload',schema)