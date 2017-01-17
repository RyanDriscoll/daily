import { combineReducers } from 'redux'
import products from 'APP/app/reducers/products'
import userProfile from 'APP/app/reducers/userProfile';

import users from 'APP/app/reducers/users'
import reservations from 'APP/app/reducers/reservation';



const rootReducer = combineReducers({
  auth: require('./auth').default, userProfile,
  categories: require('./category').default,
  products: products,
  users: users,
  reservations

})

export default rootReducer
