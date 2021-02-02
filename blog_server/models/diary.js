/*
*日记评论存储
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    content:{type:String},
    index:{type:Number},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  },
  {
    timestamps:true,
    collection:'diarys',
  })



module.exports = mongoose.model('Diary',schema)

