import React,{Component} from 'react'
import store from '../store'
import {Link} from 'react-router'

/*-----products component-----*/
export const ProductsView = (props) => {
  const products = props.allProducts
  const category = props.params.categoryId;
  const filteredProducts = products.filter(product => product.category_id === +category);

  const whichProducts = (array) => {
    return (
      array && array.map(product=>(
        <div className="ProductsView " key={product.id}>
          <div className="col-xs-3" >
            <Link className='thumbnail'  to={`/products/${product.id}`}>
              <img src={product.img_url}/>
              <div className="caption">
                <h5>
                  <div className="text-left"><span>{product.name}</span></div>
                    <div className='text-right'> <span>${parseFloat(product.price).toFixed(2)}</span></div>
                </h5>
              </div>
            </Link>
          </div>
        </div>
        )
      )
    )
  }

  return (

  <div className="container-fluid">
    <div className='main'></div>
    {
      category ? whichProducts(filteredProducts) : whichProducts(products)
    }

  </div>
)
}


/*-----products container-----*/
import {connect} from 'react-redux'
import {getProducts} from '../reducers/products'


const mapStateToProps = (state, ownProps) => {
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
  return {
    addProducts: productId=>
     (dispatch=>(dispatch(getSingleProduct(productId))))

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)
