import React, {Component} from 'react';
import {Link} from 'react-router';
import Login from '../components/Login'
import WhoAmI from '../components/WhoAmI'

export default (props) => {
  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="/"><img src="/share.png" alt="share logo"></img><span>  Dai.ly</span></a>
        </div>
        <div className="collapse navbar-collapse">

            {props.user ? <WhoAmI/> :
          <ul className="nav navbar-nav">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"></span></Link></li>
          </ul>}
        </div>
      </div>
    </div>
  );
}