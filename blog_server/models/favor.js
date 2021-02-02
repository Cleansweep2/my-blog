/**
 * 点赞表
 */
const mongoose = require('mongoose')



const schema = mongoose.Schema({
  //点赞人
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  //点赞的文章
  article:{type:mongoose.Schema.Types.ObjectId,ref:'Article'}
  },
  {
    timestamp: true,
    collection: 'favors',
  })

module.exports = mongoose.model('Favor', schema)
