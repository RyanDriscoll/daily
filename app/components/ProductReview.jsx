import React, {Component} from 'react';
import store from '../store'
import axios from 'axios';
import ProductReviewAggregator from './ProductReviewAggregator.jsx';
import { connect } from 'react-redux';
import {getProductReview} from 'APP/app/reducers/products'




class ProductReview extends Component{



    render(){
      console.log("aggregate props", this.props)
      let productRatings = this.props.ratings

    return (
         <div>
            <h1> Product Rating </h1>
            {productRatings.length === 0 ?
                <div> No Ratings available </div> :
                 <ProductReviewAggregator ratings={productRatings}/>
             }

        </div>
    )
  }


}


const mapStateToProps = (state) => {
    return {
      ratings: state.products.selectedProductRatings


    };
}



const mapDispatchToProps = (dispatch) => {
    return {
      addReviews: productId=>
       (dispatch=>(dispatch(getProductReview(productId))))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);
