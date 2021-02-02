/**
 * 分类数据库
 */

const mongoose = require('mongoose')


const schema = mongoose.Schema({
  name:{type:String}, //分类标题
  parent:{type:mongoose.Schema.Types.ObjectId,ref:'Category'} //上级分类
},
{
  collection:'categorys',
  timestamps:true,
})


module.exports = mongoose.model('Category',schema)






