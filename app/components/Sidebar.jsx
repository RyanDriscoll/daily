import React from 'react';
import {Link} from 'react-router';
import Categories from './Categories';
import UserProfileSidebar from './userProfile/UserProfileSidebar.jsx';

export default (props) => {
  const { id } =  props.params;
  return (

    <sidebar className="col-xs-2">
      {
        props.location.pathname.startsWith('/userProfile') ? <UserProfileSidebar userId={id}  /> : <Categories />
      }

    </sidebar>


  )
}

