import React from 'react';

import ReviewAggregator from '../ReviewAggregator.jsx';

export default function (props) {
    let pastSellingRatings = props.sellingRatings.map(rating=> {
        return rating.sellerReview;
    });

    let pastRentingRatings = props.rentingRatings.map(rating=> {
        return rating.renterReview;
    })

    return (
         <div>
            <div> Rating as Seller </div>
            {pastSellingRatings.length === 0 ?
                <div> No Ratings available </div> :
                 <ReviewAggregator size={80} ratings={pastSellingRatings}/>
             }
             <div> Rating as Buyer </div>
             {pastRentingRatings.length === 0 ?
                 <div> No Ratings available </div> :
                <ReviewAggregator size={80} ratings={pastRentingRatings}/>}


        </div>
    )
}
