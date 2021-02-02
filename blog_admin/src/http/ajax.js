import axios from 'axios'
import NProgress from 'nprogress' // 引入nprogress插件

export default function ajax(url,data={},type="GET"){

    type = type.toLocaleUpperCase()
    //'http://39.107.126.56'
    axios.defaults.baseURL = 'http://39.107.126.56/admin'
    axios.defaults.withCredentials = true
    if(type === 'GET'){
        const keys = Object.keys(data)
        let dataStr = '?'
        keys.forEach(key=>{
            dataStr = dataStr + key+ '=' + data[key] + '&'
        }) 
        if(keys.length > 0){
            url = url + dataStr
            url = url.substring(url.lastIndexOf('&'),0)
        }
        return axios.get(url)
    }else if(type === "POST"){
        return axios.post(url,data)
    }else{
      axios[type.toLowerCase()](url,data)
    }
}


// axios请求拦截器
axios.interceptors.request.use(
  config => {
    NProgress.start() // 设置加载进度条(开始..)
    const token = localStorage.tokenA
    config.headers.token = token ? token : ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
axios.interceptors.response.use(
  function(response) {
    NProgress.done() // 设置加载进度条(结束..)
    if(response.data.errorCode === 7)
    {

    }
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)
