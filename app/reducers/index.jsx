import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';
import userProfile from 'APP/app/reducers/userProfile';


const rootReducer = combineReducers({
  auth: require('./auth').default, user
  , userProfile
})

export default rootReducer
