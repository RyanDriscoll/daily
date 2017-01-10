import React, {Component} from 'react';
import Login from '../components/Login'
import WhoAmI from '../components/WhoAmI'

export default (props) => {
  return (
    <div>
      <div className="navbar navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="/"><img src="/share.png" alt="share logo"></img><span>Dai.ly</span></a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              {user ? <WhoAmI/> : <Login/>}
            </li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}