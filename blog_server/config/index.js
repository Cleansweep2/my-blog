/**
 * 全局的配置
 */

module.exports = {
  PORT:3001, //端口号
  SUCCESS:0, //请求成功
  FAIL:1,  //请求失败
  NOTUSER:6, //没有此用户
  EXI:7,     //token过期
  PARAM_ERROR:8,
  SALT:'c_1075529449', //盐
  SECRET:'xxx_1075529449',
  URL:'mongodb://localhost:27017/my-blog',
  MONGODB_CONFIG:{ //mongodb配置  mongoose
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  }
}

