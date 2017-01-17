import React, {Component} from 'react';

// import rating from './stars/star';
// import StarRating from 'react-bootstrap-star-rating';
import ReactStars from 'react-stars'




export default function Review(props) {

    let ratings = props.ratings

    console.log("RATINGL<>DFSLKJ:DFSKLDFS:::::", props)
    let size = props.size || 24;



    let totalStars = ratings.reduce((initial, rating) => initial + rating.renterReview.stars, 0);
    console.log("totalStars", totalStars)
    let averageRating = totalStars / ratings.length;

    return(
        <div>
            <ReactStars
                count={averageRating}
                size={size}
                color1={'#ffd700'}
                color2={'#ffd700'} />
        </div>
    )
}
