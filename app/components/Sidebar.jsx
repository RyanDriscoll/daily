import React from 'react';
import {Link} from 'react-router';
import Categories from './Categories';
import UserProfileSidebar from './userProfile/UserProfileSidebar.jsx';

export default (props) => {
  const { id } =  props.params;
  return (

    <sidebar className="col-md-2">
      {
        props.location.pathname.startsWith('/userProfile') ? <UserProfileSidebar userId={id}  /> : <Categories />
      }

    </sidebar>


  )
}

// import {connect} from 'react-redux'

// export default connect (
//   (state) => {
//     return { categories: state.categories.categories }
//   }
// ) (Sidebar)
