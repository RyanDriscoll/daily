import React, {Component} from 'react';
import store from '../store'
import axios from 'axios';
import ReviewAggregator from './ReviewAggregator.jsx';
import { connect } from 'react-redux';
import {getProductReview} from 'APP/app/reducers/products'




class ProductReview extends Component{



    // let productRatings = props.productRatings.map(rating=> {
    //     return rating.sellerReview;
    // })
    render(){
      console.log("THIS PROPS", this.props)
      let productRatings = this.props.ratings

    return (
         <div>
            <h1> Product Rating </h1>
            {productRatings.length === 0 ?
                <div> No Ratings available </div> :
                 <ReviewAggregator ratings={productRatings}/>
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
