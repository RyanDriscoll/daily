import React, { Component } from 'react';

import ReviewAggregator from '../ReviewAggregator.jsx';
import SingleReviewContainer from './SingleReviewContainer.jsx';
import moment from 'moment';

export default function (props) {

    console.log('PROPS IN PENDING REVIEW:', props);

    return (
          <div className="col-md-12 transaction-container">
                            <label className="transaction-history-title"> Pending Reviews </label>
                            <div>
                                <label className="transaction-history-label"> Please rate your experiences as a renter </label>
                                    <ul className="list-group">
                                      {props.pendingAsRenterReview.length=== 0 ?
                                          <li className="list-group-item">
                                            <div> Nothing to review as renter </div>
                                          </li>
                                          : props.pendingAsRenterReview.map(transaction => {
                                                return (
                                                    <SingleReviewContainer key={transaction.id} transaction={transaction} />
                                                )
                                        })}
                                    </ul>
                            </div>
                            <div>
                                <label className="transaction-history-label"> Please rate your experiences as a seller </label>
                                     <ul className="list-group">
                                        {props.pendingAsSellerReview.length=== 0 ?
                                          <li className="list-group-item">
                                            <div> Nothing to review as seller </div>
                                          </li>
                                          : props.pendingAsSellerReview.map(transaction => {
                                                return(
                                                     <SingleReviewContainer key={transaction.id} transaction={transaction} />
                                                )
                                        })}
                                </ul>
                            </div>
                </div>
        )
    }



