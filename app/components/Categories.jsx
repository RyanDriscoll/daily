import React from 'react'
import {Link} from 'react-router'
import {getUniqueAndSort} from 'APP/app/reducers/category'

export const Categories = (props) => (
  <div>
    <section className="sidebar-title">
      <h3 className="menu-item">
        CATEGORIES
      </h3>
    </section>
    <section>
      <Link to='/products'>
        <h4 className="menu-item">
          ALL PRODUCTS
        </h4>
      </Link>
    </section>
    <ul className="list-unstyled">
    {
      props.categories && getUniqueAndSort(props.categories)
        .map(category => (
          <li key={category.id} className="menu-item">
            <section>
              <Link to={`/products/categories/${category.id}`}><h4>{category.name}</h4></Link>
            </section>
          </li>
          )
        )
    }
    </ul>
    </div>
)

import {connect} from 'react-redux'

export default connect (
  (state) => {
    return { categories: state.categories.categories }
  }
) (Categories)