import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';
import products from 'APP/app/reducers/products'


const rootReducer = combineReducers({
  auth: require('./auth').default, user, products
})

export default rootReducer
