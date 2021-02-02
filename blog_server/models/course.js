/*
*历程 时间轴管理
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    title:{type:String},
    content:{type:String},
    is_finish:{type:Number,enum:[0,1]},  //0是完成 1是没有完成
    start:{type:Date},
    end:{type:Date}
  },
  {
    timestamps:true,
    collection:'courses',
  })


module.exports = mongoose.model('Course',schema)