import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route,Switch ,Redirect} from 'react-router-dom'
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'

import App from './App.jsx';
import Login from './containers/Login.jsx'
import store from './redux/store'

import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import './assets/style/base.css'


const el = (
  <div title="111">
    <div></div>
  </div>
)

console.log(el)

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
      <Switch>
        <Route path="/main" component={App}></Route>
        <Route path="/login" component={Login}></Route>
        <Redirect to="/login"></Redirect>
        </Switch>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
