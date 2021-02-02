/**
 * 轮播图模型
 */
const mongoose = require('mongoose')


const schema = mongoose.Schema({
  imgUrl:{type:String}, //图片路径
  desc:{type:String}, //标题
  //图片所在地
  isCover:{type:Boolean,default:false},
  localtion:{type:String},
  //图片所属分类
  category:{type:String},
  author:{type:String},
  watch_num:{type:Number,default:0}
},{
  timestamps:true,
  collection:'images'
})


const Images = mongoose.model('Image',schema)

// Images.update({_id:'5f1a5d02f48bd50b9073e6f0'},{author:'本叔班_护士姐姐',isCover:true,localtion: '美图',imgUrl:'https://s1.ax1x.com/2020/07/24/UjexRs.jpg',watch_num:0},).then(res=>{
//   console.log(res)
// })

module.exports = Images