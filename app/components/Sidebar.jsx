import React from 'react'
import {Link} from 'react-router'

const getUniqueAndSort = (arr) => {
  const seen = {};
  return arr.filter(item => {
    if (seen[item.name]) return;
    seen[item.name] = 1;
    return item;
  }).sort(function(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });
}

export const Sidebar = (props) => (
  <sidebar className="col-md-2">
    <section className="sidebar-title">
      <h3 className="menu-item">
        CATEGORIES
      </h3>
    </section>
    <ul className="list-unstyled">
    {
      props.categories && getUniqueAndSort(props.categories)
        .map(category => (
          <li key={category.id} className="menu-item">
            <section>
              <Link to={`/category/${category.id}`}><h4>{category.name}</h4></Link>
            </section>
          </li>
          )
        )
    }
    </ul>
  </sidebar>
)

import {connect} from 'react-redux'

export default connect (
  (state) => {
    return { categories: state.categories.categories }
  }
) (Sidebar)