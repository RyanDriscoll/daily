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
        <div className="">
          <div className="col-xs-6 product-view" >
            <h1>{product.name && product.name.toUpperCase()}</h1>
            <img id="single-product" src={product.img_url}/>
            <div className="prodInfo">
              <h3>${product.price} per day</h3>
            </div>
            <div className="prodInfo">
              <h3>{product.address}<br/>{product.city}, {product.state} {product.zip}</h3>
            </div>
            <div className="prodInfo">
              <h3>{product.description}</h3>
            </div>
          </div>
          <Reservation />
        </div>
      </div>
    </div>
  )
}


/*-----products container-----*/
import {connect} from 'react-redux'
import {getSingleProduct} from '../reducers/products'


const mapStateToProps = (state, ownProps) => {
  console.log("MSTP SINGLE", state)
  return {
    product: state.products.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
  console.log("MDTP PROPS")
  return {
    addProduct: productId=>
     (dispatch=>(dispatch(getSingleProduct(productId))))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
