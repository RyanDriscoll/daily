import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'
import {getCategories} from './reducers/category'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware)))

export default store

// Set the auth info at start
store.dispatch(whoami())
store.dispatch(getCategories())
