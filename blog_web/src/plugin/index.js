import Vue from 'vue';

//axios
import axios from 'axios'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//懒加载
import VueLazyload from 'vue-lazyload'

//animate.css 
import 'animate.css';

//移动端clcik延迟300秒解决
import fastclick from 'fastclick'

//即使预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

//粒子特效
/* import VueParticles from 'vue-particles' */


//element ui注册
Vue.use(ElementUI);
//懒加载注册
Vue.use(VueLazyload, {
  preLoad:1,
  error: 'https://s1.ax1x.com/2020/07/27/aPDYHH.jpg',
  loading: 'https://s1.ax1x.com/2020/07/27/aPD1gK.gif',
  attempt: 3
})

//axios注册

//'http://39.107.126.56/web'
const service = axios.create({
  baseURL: 'http://39.107.126.56/web'
})
Vue.prototype.$http = service

//vue事件总线
Vue.prototype.$bus = new Vue()

//click
fastclick.attach(document.body)


//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999999,
    toolbar: true
  } })






