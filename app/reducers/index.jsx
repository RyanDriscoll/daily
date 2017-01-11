import { combineReducers } from 'redux'
import products from 'APP/app/reducers/products'
import userProfile from 'APP/app/reducers/userProfile';


const rootReducer = combineReducers({
  auth: require('./auth').default, products, userProfile
})

export default rootReducer
