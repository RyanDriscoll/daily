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
         <div className="aggregate-rating-container list-group">
            <div className="col-md-6">
            <div className="rating-label"> Rating as Seller </div>
            {pastSellingRatings.length === 0 ?
                <div className="no-rating-label"> No Ratings available </div> :
                <div className="rating-stars">
                 <ReviewAggregator  size={80} ratings={pastSellingRatings}/>
                 </div>
             }
             </div>

             <div className="col-md-6">
             <div className="rating-label"> Rating as Renter </div>
             {pastRentingRatings.length === 0 ?
                 <div className="no-rating-label"> No Ratings available </div> :
                <div className="rating-stars">
                <ReviewAggregator className="rating-stars" size={80} ratings={pastRentingRatings}/>
                </div>}
            </div>
        </div>
    )
}
