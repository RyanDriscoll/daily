import { combineReducers } from 'redux'

import userProfile from 'APP/app/reducers/userProfile';


const rootReducer = combineReducers({
  auth: require('./auth').default,
   userProfile
})

export default rootReducer
