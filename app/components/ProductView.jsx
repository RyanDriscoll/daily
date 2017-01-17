import React,{Component} from 'react'
import store from '../store'
import {Link} from 'react-router'
import Reservation from './Reservation'
import {getProductReview} from 'APP/app/reducers/products'
import ProductReview from './ProductReview.jsx'


/*-----products component-----*/
export const ProductView = (props) => {

  const product = props.product

  return (

    <div className="container ">
      <div className='main'>
          <div className="ProductsView ">
            <div className="col-xs-3" key={product.id}>
              <img src={product.img_url}/>
              <div className='caption'>
                <div className="name and price">
                  <h5>
                    <span>{product.name}</span>
                  </h5>
                  <div>
                  <h5>
                    <div className="caption">
                    <span>{product.address}</span>
                    </div>
                    <div className="caption">
                    <span>{product.city}, {product.state}, {product.zip}</span>
                    </div>
                  </h5>
                  <Reservation />
                  <ProductReview/>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}


/*-----products container-----*/
import {connect} from 'react-redux'
import {getSingleProduct} from '../reducers/products'


const mapStateToProps = (state, ownProps) => {

  return {
    product: state.products.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>{

  return {
    addProduct: productId=>
     (dispatch=>(dispatch(getSingleProduct(productId))))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
