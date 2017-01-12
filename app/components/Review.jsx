import React, {Component} from 'react';
// import rating from './stars/star';
// import StarRating from 'react-bootstrap-star-rating';
import ReactStars from 'react-stars'


export default function Review(props) {


    let reviews = props.review;
    console.log("REVIEWS", props.review)





    return(
        <div className='col-md-10'>
            {reviews.map( singleReview => {
                    return (
                        <div key={singleReview.id}>
                            <p>id: {singleReview.id},</p>
                            <p>stars: {singleReview.stars},</p>
                            <ReactStars
                                count={singleReview.stars}
                                size={24}
                                onChange={props.ratingChanged}
                                edit={props.edit}
                                color1={props.color1}
                                color2={'#ffd700'} />

                            <p>text: {singleReview.text},</p>
                            <p>reservation_id: {singleReview.reservation_id}</p>
                        </div>
                    )
                }
            )}
        </div>
    )

}
<<<<<<< HEAD
=======

>>>>>>> master
