import React from 'react'
import {Link} from 'react-router'

export const Sidebar = (props) => (
  <sidebar>
    <section>
        <h4 className="menu-item">
          CATEGORIES
        </h4>
      </section>
      {
        props.categories &&
      }
  </sidebar>
)

import {connect} from 'react-redux'

export default connect (
  (state) => ({ categories: state.categories })
) (Sidebar)