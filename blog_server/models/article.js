/**
 * 文章 存储
 */
const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    //作者
    author:{type:String},
    //封面
    cover:{type:String},
    //文章所属分类
    category:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}],
    //文章标题
    title:{type:String},
    //文章描述
    desc:{type:String},
    //评论数量
    comment_num:{type:Number,default:0},
    //读的数量
    read_num:{type:Number,default:0},
    //文章内容
    content:{type:String},
    content1:{type:String}, //文章内容 markdown版本
    //文章点赞量
    favor:{type:Number,default:0},
    //文章来源
    source:{type:String,default:'个人'},
    //是否原创
    isOriginal:{type:Boolean,default:true},
    //是否为推荐文章
    isRecommend:{type:Boolean,default:false},
    //标签
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:'Tag'}],
    //文章归档时间
    article_file:{type:String},
    search_num:{type:Number, default:0}
  },
  {
    timestamps:true,
    collection:'articles',
  })


const Article = mongoose.model('Article',schema)


module.exports = Article