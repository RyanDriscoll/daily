import React from 'react';

export default const Ratings =  (props) => {
    return (
         <div>
            <div> Aggregate Seller Rating </div>
            <div> {aggregateRatingAsSeller}</div>
            <div> Aggregate Renter Rating </div>
            <div> {aggregateRatingAsRenter}</div>
        </div>
    )

}