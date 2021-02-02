/*
*个人信息
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    //html内容
    content1:{type:String},
    //常规内容
    content:{type:String},
    //是否展示给客户端
    isShow:{type:Boolean,default:false}
  },
  {
    timestamps:true,
    collection:'infos',
  })


module.exports = mongoose.model('Info',schema)



