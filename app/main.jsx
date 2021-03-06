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
import Cart from './components/Cart'
import UserProfile from './components/UserProfile.jsx'
import AccountInfoFormContainer from './components/userProfile/AccountInfoFormContainer.jsx'
import TransactionHistory from './components/userProfile/TransactionHistory.jsx';
import FutureReservations from './components/userProfile/FutureReservations.jsx';
import AggregateRatings from './components/userProfile/AggregateRatings.jsx';
import PendingReviews from './components/userProfile/PendingReviews.jsx';

import CategoriesAdmin from './components/userProfile/CategoriesAdmin.jsx';
import UsersAdmin from './components/userProfile/UsersAdmin.jsx';
import PostedProducts from './components/userProfile/PostedProducts.jsx';


import Sidebar from './components/Sidebar'
import ProductsView from './components/ProductsView'
import ProductView from './components/ProductView'
import PostProduct from './components/PostProduct'
import {getProducts} from './reducers/products'
import {getSingleProduct} from './reducers/products'
import {getProductReview} from './reducers/products'
import {getReservationsForProduct} from './reducers/reservation'
import OrderComplete from './components/OrderComplete'




const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children, router }) =>
    <div>
      <Navbar user={user} />
      <Sidebar user={user} location={router.location} params={router.params} />
      {children}
    </div>
)

const onProductsEnter = (nextRouterState)=>{

  store.dispatch(getProducts())


}

const onProductEnter=nextRouterState=>{
  const productId = nextRouterState.params.productId;
  store.dispatch(getSingleProduct(productId))
  store.dispatch(getProductReview(productId))
  store.dispatch(getReservationsForProduct(productId))

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
          <Route path="futureReservations" component={FutureReservations}/>
          <Route path="aggregateRatings" component={AggregateRatings}/>
          <Route path="pendingReviews" component={PendingReviews}/>
          <Route path="postedProducts" component={PostedProducts}/>
          <Route path="categoriesAdmin" component={CategoriesAdmin}/>
          <Route path="usersAdmin" component={UsersAdmin}/>
        </Route>
        <Route path="login" component={Login}/>
        <Route path="post" component={PostProduct}/>
        <Route path="cart" component={Cart}/>
        <Route path="orderComplete" component={OrderComplete}/>

      <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
