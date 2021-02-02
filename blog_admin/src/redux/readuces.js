
import {combineReducers} from "redux"

import {
  LOGIN_SUCCESS,
  VERIFY_FAIL
} from './actions-type'


const userInfo = {
  avatar: "",
  gender: 0,
  userName: "",
  _id: ""
}


function User(state = userInfo,action)
{
  switch(action.type)
  {
    case LOGIN_SUCCESS:
      return action.data
      break
    case VERIFY_FAIL:
      return action.data
    default :
      return state
  }
}


export default combineReducers({
  User
})