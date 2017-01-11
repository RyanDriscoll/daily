import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';
import products from 'APP/app/reducers/products'
import userProfile from 'APP/app/reducers/userProfile';


const rootReducer = combineReducers({
  auth: require('./auth').default, user,
  categories: require('./category').default,
})

export default rootReducer
