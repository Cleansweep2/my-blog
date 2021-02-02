/**
 * 后台用户登录
 */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
  //密码
  password: {//用户密码
    type: String,
    require: true,
    set: (val) => {
      //对密码进行加密
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt)
      return hash
    }
  },
    //用户邮箱
  email:{type:String},
    //用户昵称
  userName: {
    type: String,
    require: true,
  },
  //是不是管理员
  isAdmin:{
    type:Boolean,
    default:false
  },
    //用户头像
  avatar: {
    type: String,
  },
  //用户描述
  desc:{type:String},
},
  {
    timestamp: true,
    collection: 'users',
  })

User = mongoose.model('User', schema)

module.exports = User

