import React, {Component} from 'react';
// import rating from './stars/star';
import StarRating from 'react-bootstrap-star-rating';


export default function Review(props) {
    let reviews = props.review;

    console.log('props.review in review', props.review)

    return(
        <div className='col-md-10'>
            {reviews.map( singleReview => {
                    return (
                        <div key={singleReview.id}>
                            <p>id: {singleReview.id},</p>
                            <p>stars: {singleReview.stars},</p>

                            <StarRating
                                className='rating'
                                defaultValue={5}
                                min={0}
                                max={10}
                                step={0.5} />
                            <p>text: {singleReview.text},</p>
                            <p>reservation_id: {singleReview.reservation_id}</p>
                        </div>
                    )
                }
            )}
        </div>
    )

}

