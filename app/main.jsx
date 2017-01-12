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

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar user={user} />
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
    {/*<Router history={hashHistory}>*/}
      <Route path="/" component={ExampleApp}>
        <Route path="signup" component={Signup}/>
        <Route path="userProfile/:id" component={UserProfile}>
          <Route path="accountInfo" component={AccountInfoFormContainer}/>
          <Route path="transactionHistory" component={TransactionHistory}/>
        </Route>
        <Route path="login" component={Login}/>

        {/*<IndexRedirect to="/products" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)