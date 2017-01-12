import React,{Component} from 'react'
import store from '../store'
import {Link} from 'react-router'

/*-----products component-----*/
export const ProductView = (props) => {

  const product = props.product
  console.log("PRODUCT", product)
  return (

    <div className="container ">
      <div className='productView'>
          <div className="ProductView ">
            <div className="col-xs-3" key={product.id}>
              <img src={product.img_url}/>
              <div className='caption'>
                <div className="name and price">
                  <h5>
                    <span>{product.name}   {'$'}{product.price}</span>
                  </h5>
                </div>
                <div className="row">
                <h5>
                  <div>
                  <span>{product.address}</span>
                  </div>
                  <div>
                  <span>{product.city}, {product.state}, {product.zip}</span>
                  </div>
                </h5>
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
