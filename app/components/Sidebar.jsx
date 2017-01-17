import React from 'react';
import {Link} from 'react-router';
import Categories from './Categories';
import UserProfileSidebar from './userProfile/UserProfileSidebar.jsx';

export default (props) => {
  const { id } =  props.params;
  return (

    <sidebar className="col-md-2">
      {
        props.location.pathname.startsWith('/userProfile') ? <UserProfileSidebar user={props.user} userId={id}  /> : <Categories />
      }

    </sidebar>

  )
}

