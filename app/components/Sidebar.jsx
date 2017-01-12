import React from 'react';
import {Link} from 'react-router';
import Categories from './Categories';

export default (props) => {
  return (
    <sidebar className="col-md-2">
      <Categories />
    </sidebar>
  )
}

// import {connect} from 'react-redux'

// export default connect (
//   (state) => {
//     return { categories: state.categories.categories }
//   }
// ) (Sidebar)