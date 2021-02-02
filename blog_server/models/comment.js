/*
*前台评论存储
 */
const mongoose = require('mongoose')


const schema = mongoose.Schema(
  {
    //发表人
    publisher:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    //留言内容
    content:{type:String},
    //向哪个评论留言
    // to: {type:String},
    //来自于哪个人的评论
    to:{type:mongoose.Schema.Types.ObjectId,ref:'Comment'},
    //审核情况
    verification:{
      type:Number,
      /**
       * @1为审核通过
       * @2为待审核
       */
      enum:[0,1]
    },
    //评论的是哪一篇文章
    article:{type:mongoose.Schema.Types.ObjectId,ref:'Article'},
    //在哪评论的
    localtion:{type:String}
  },
  {
    timestamps:true,
    collection:'comments',
    toJSON:{virtuals:true}
  })
schema.virtual('froms',{
  ref:'Comment',
  localField:'_id',
  foreignField:'to',
  justOne:false
})





module.exports = mongoose.model('Comment',schema)