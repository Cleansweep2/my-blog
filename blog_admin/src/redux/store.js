import {createStore,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reduces from './readuces'


export default createStore(reduces,composeWithDevTools(applyMiddleware(thunk)))