/*
*个人信息
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    //友链名称
    name:{type:String},
    //友链链接
    link:{type:String}
  },
  {
    timestamps:true,
    collection:'links',
  })


module.exports = mongoose.model('Link',schema)



