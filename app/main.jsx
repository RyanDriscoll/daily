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
import AccountInfoFormContainer from './components/userProfile/AccountInfoFormContainer.jsx'
import TransactionHistory from './components/userProfile/TransactionHistory.jsx';

import Sidebar from './components/Sidebar'
import ProductsView from './components/ProductsView'

import ReviewsByUser from './components/ReviewsByUser'

import ProductView from './components/ProductView'

import {getProducts} from './reducers/products'
import {getSingleProduct} from './reducers/products'



const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children, router }) =>
    <div>
      <Navbar user={user} />
      <Sidebar location={router.location} />
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
        <Route path="products" component={ProductsView} onEnter={onProductsEnter}>
          <Route path ="categories/:categoryId" component={ProductsView} />
        </Route>
        <Route path='/products/:productId' component={ProductView} onEnter={onProductEnter}/>
        <Route path="signup" component={Signup}/>
        <Route path="userProfile/:id" component={UserProfile}>
          <Route path="accountInfo" component={AccountInfoFormContainer}/>
          <Route path="transactionHistory" component={TransactionHistory}/>
        </Route>
        <Route path="login" component={Login}/>
        <Route path="review" component={ReviewsByUser}/>

      <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
