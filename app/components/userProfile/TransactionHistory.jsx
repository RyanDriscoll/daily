import React from 'react';
import moment from 'moment';

export default function (props)  {
    return (
              <div className="col-md-12 transaction-container">
                            <label className="transaction-history-title"> Transaction History </label>
                            <div>
                                <label className="transaction-history-label"> Renting History </label>
                                    <ul className="list-group">
                                      {props.rentedTransactions.length=== 0 ?
                                          <li className="list-group-item">
                                            <div> No Renting History</div>
                                          </li>
                                          : props.rentedTransactions.map(transaction => {
                                                return( <li key={transaction.id} className="list-group-item"><div>
                                                    <div> Date: {moment(transaction.date).format('MM-DD-YYYY')} </div>
                                                    <div>Product Name: {transaction.product.name} </div>
                                                    <div>Product description: {transaction.product.description}</div>
                                                    <div>Address: {transaction.product.address},{transaction.product.city}, {transaction.product.state}, {transaction.product.zip}  </div>
                                                    <div> Price: ${transaction.product.price} </div>
                                                    <div> <img src={transaction.product.img_url}/> </div>
                                                </div></li>)
                                        })}
                                    </ul>

                            </div>
                            <div>
                                <label className="transaction-history-label"> Selling History </label>
                                     <ul className="list-group">
                                        {props.soldTransactions.length=== 0 ?
                                          <li className="list-group-item">
                                            <div> No Selling History</div>
                                          </li>
                                          : props.soldTransactions.map(transaction => {
                                                return( <li key={transaction.id} className="list-group-item"><div>
                                                    <div> Date: {moment(transaction.date).format('MM-DD-YYYY')} </div>
                                                    <div>Product Name: {transaction.product.name} </div>
                                                    <div>Product description: {transaction.product.description}</div>
                                                    <div>Address: {transaction.product.address},{transaction.product.city}, {transaction.product.state}, {transaction.product.zip}  </div>
                                                    <div> Price: ${transaction.product.price} </div>
                                                    <div> <img src={transaction.product.img_url}/> </div>
                                                </div></li>)
                                        })}
                                </ul>
                            </div>
                </div>
    )
}