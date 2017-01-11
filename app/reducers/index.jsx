import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';
import products from 'APP/app/reducers/products'
import userProfile from 'APP/app/reducers/userProfile';


const rootReducer = combineReducers({
  auth: require('./auth').default, user, products, userProfile
})

export default rootReducer
