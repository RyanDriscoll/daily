'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Login from './components/Login.jsx'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Signup from './components/Signup.jsx'
import UserProfile from './components/UserProfile.jsx'
import ProductsView from './components/ProductsView'
import ProductView from './components/ProductView'
import {getProducts} from './reducers/products'
import {getSingleProduct} from './reducers/products'



const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar user={user} />
      {children}
    </div>
)

const onProductsEnter = (nextRouterState)=>{
  store.dispatch(getProducts())
}

const onProductEnter=nextRouterState=>{
  const productId = nextRouterState.params.productId;
  store.dispatch(getSingleProduct(productId))
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Route path="products" component={ProductsView} onEnter={onProductsEnter}/>
        <Route path='/products/:productId' component={ProductView} onEnter={onProductEnter}/>
        <Route path="signup" component={Signup}/>
        <Route path="userProfile/:id" component={UserProfile}/>
        <Route path="login" component={Login}/>

      <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
