import { message } from 'antd'

import { login } from '../http'
import {
  LOGIN_SUCCESS,
  VERIFY_FAIL
} from './actions-type'


/* 这是用户信息的action */
const getInfoAsync = (type, data) => {
  return { type, data }
}


export const clearInfoAsync = ()=>{
    return {type:VERIFY_FAIL,data:{avatar: "",userName: "",_id: ""}}
}





/* 这是用户信息的异步action */
export const getInfoSync = (data) => {
  return async dispatch => {
    const res = await login(data)
    const result = res.data
    const { errCode, user } = result
    const msg = result.message
    if (errCode !== 0) {
      return message.error(msg, 1)
    }
    localStorage.tokenA = result.token
    dispatch(getInfoAsync(LOGIN_SUCCESS, user))
  }
}


// 3 5