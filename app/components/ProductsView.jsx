import React,{Component, PropTypes} from 'react'
import store from '../store'
import {Link} from 'react-router'



/*-----products component-----*/
export const ProductsView = (props) => {

  const products = props.allProducts

  return (

  <div className="container-fluid">
    <div className='main'></div>
    {
      products.map(product=>(
        <div className="ProductsView ">
          <div className="col-xs-3" key={product.id}>
            <Link className='thumbnail' to={'/products'}>
            <img src={product.img_url}/>
            <div className="caption">
              <h5>
                <span>{product.name}</span>
              </h5>
            </div>
            </Link>
        </div>
      </div>
      )
    )
    }

  </div>
)
}


/*-----products container-----*/
import {connect} from 'react-redux'
import {getProducts} from '../reducers/products'


const mapStateToProps = (state, ownProps) => {
  console.log("MSTP", state)
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
  return {
    addProducts: (dispatch=>(dispatch(getProducts())))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)
