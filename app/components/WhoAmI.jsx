import React from 'react'
import {Link} from 'react-router'

export const WhoAmI = ({ user, logout }) => {
return (
  <div className="collapse navbar-collapse">
    <ul className="nav navbar-nav">
      <li><Link>Welcome {user && user.firstName}</Link></li>
      <li><Link to={`/userProfile/${user.id}`}>My Account</Link></li>
      <li><Link to="/post"><span>Post A Product</span></Link></li>
      <li><Link to="/products"><span onClick={logout}>Logout</span></Link></li>
      <li><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"></span></Link></li>
    </ul>
  </div>
)
}

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout}
) (WhoAmI)
