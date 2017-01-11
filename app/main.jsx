'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Signup from './components/Signup.jsx'
import ProductsView from './components/ProductsView'
import {getProducts} from './reducers/products'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar user={user} />
      {children}
    </div>
)

const onProductsEnter = ()=>{
  store.dispatch(getProducts())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Route path="products" component={ProductsView} onEnter={onProductsEnter} />
        <Route path="signup" component={Signup}/>
        {/*<IndexRedirect to="/products" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
