/*
*标签管理
 */
const mongoose = require('mongoose')


const schema = mongoose.Schema(
  {
    //标签名称
    tag_name:{type:String},
    //标签序号
    index:{type:Number}
  },
  {
    timestamps:true,
    collection:'tags',
    toJSON:{virtuals:true}
  })

schema.virtual('articleList',{
  ref:'Article',
  localField:'_id',
  foreignField:'tags',
  justOne:false
})

module.exports = mongoose.model('Tag',schema)