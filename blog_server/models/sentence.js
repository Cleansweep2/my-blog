/*
*每日一句管理
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema(
  {
    content:{type:String},
    author:{type:String},
    blogger:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    images:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps:true,
    collection:'sentences',
  })

module.exports = mongoose.model('Sentence',schema)