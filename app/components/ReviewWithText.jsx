import React, {Component} from 'react';
// import rating from './stars/star';
// import StarRating from 'react-bootstrap-star-rating';
import ReactStars from 'react-stars'
import {connect} from 'react-redux'



 class ReviewsWithText extends Component{


    render(){

      let reviews = this.props.ratings;
      // console.log("REVIEWS", props.review)
      console.log("THIS PROPS REVIEW TEXT", this.props)

        return(
            <div className='col-md-10'>
                {reviews.map( singleReview => {
                    console.log("SINGLE REVIEW", singleReview)
                        return (
                            <div key={singleReview.id}>
                              <div>{singleReview.renter.firstName} {singleReview.renter.lastName.slice(0,1)}</div>
                                <ReactStars
                                    count={singleReview.renterReview.stars}
                                    size={24}
                                    onChange={this.props.ratingChanged}
                                    edit={this.props.edit}
                                    color1={this.props.color1}
                                    color2={'#ffd700'} />

                                  <p>{singleReview.renterReview.text}</p>
                            </div>
                        )
                    }
                )}
            </div>
        )
      }
}


const mapStateToProps = (state, ownProps) => {
    return {
      ratings: state.products.selectedProductRatings

    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsWithText);
