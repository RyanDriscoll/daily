import { combineReducers } from 'redux'
import user from 'APP/app/reducers/user';
import categories from 'APP/app/reducers/category';


const rootReducer = combineReducers({
  auth: require('./auth').default, user,
  categories: require('./category').default, categories
})

export default rootReducer
