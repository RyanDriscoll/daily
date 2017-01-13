import React, {Component} from 'react';
// import rating from './stars/star';
// import StarRating from 'react-bootstrap-star-rating';
import ReactStars from 'react-stars'


export default function ReviewAggregator(props) {


  let reviews = props.review;
  console.log("REVIEWS", props.review)


  let ratings =  props.ratings

    const ratingAggregtor = (array)=>{
      let stars = array.map(review=>{
        return review.stars
      })

    let rating = stars.reduce((a,b)=>{
        return a+b
      }, 0)

      return rating/ratings.length
    }

    return(
        <div className='col-md-10'>
          <ReactStars
              count={this.ratingAggregtor(ratings)}
              size={24}

              edit={props.edit}
              color1={props.color1}
              color2={'#ffd700'} />
        </div>
    )

}
