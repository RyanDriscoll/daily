import React, {Component} from 'react';


export default function Review(props) {

    let reviews = props.review;
    console.log("REVIEWS", props.review)
    console.log('props.review in review', props.review)
    return(
        <div>
            {reviews.map( singleReview => {
                    return (
                        <div key={singleReview.id}>
                            <p>id: {singleReview.id},</p>
                            <p>stars: {singleReview.stars},</p>
                            <p>text: {singleReview.text},</p>
                            <p>reservation_id: {singleReview.reservation_id}</p>
                        </div>
                    )
                }
            )}
        </div>
    )

}
