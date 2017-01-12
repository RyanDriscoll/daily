import React,{Component} from 'react'
import store from '../store'
import {Link} from 'react-router'

/*-----products component-----*/
export const ProductsView = (props) => {
  console.log("PRODS PROPS", props)
  const products = props.allProducts

  return (

  <div className="container-fluid">
    <div className='main'></div>
    {
      products && products.map(product=>(
        <div className="ProductsView " key={product.id}>
          <div className="col-xs-3" >
            <Link className='thumbnail'  to={`/products/${product.id}`}>
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
