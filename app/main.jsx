'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login.jsx'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Sidebar from './components/Sidebar'

import ProductsView from './components/ProductsView'
import {getProducts} from './reducers/products'
import UserProfile from './components/UserProfile.jsx'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar user={user} />
      <Sidebar />
      {children}
    </div>
)

const onProductsEnter = ()=>{
  store.dispatch(getProducts())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
    {/*<Router history={hashHistory}>*/}
      <Route path="/" component={ExampleApp}>
        <Route path="products" component={ProductsView} onEnter={onProductsEnter} />
        <Route path="signup" component={Signup}/>
        <Route path="userProfile/:id" component={UserProfile}/>
        <Route path="login" component={Login}/>

        {/*<IndexRedirect to="/products" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
