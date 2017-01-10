import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';


const rootReducer = combineReducers({
  auth: require('./auth').default, user
})

export default rootReducer
