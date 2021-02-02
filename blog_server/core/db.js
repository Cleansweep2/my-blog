const mongoose = require('mongoose')


module.exports = ()=>{

//连接数据库
mongoose.connect(global.config.URL,global.config.MONGODB_CONFIG)

// 连接错误
mongoose.connection.on('error', error => {
  console.log('数据库连接失败!', error)
})

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功!')
})
}





 