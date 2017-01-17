import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {clearCart} from '../reducers/reservation'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';



class Cart extends Component{
    constructor(props){
        super(props)
        this.display = [];
        this.sum = 0;
    }

    onToken = (token) => {
    let cart = this.props.cart

        axios.post('api/reservations/save-stripe-token', {
            body: token
        })
            .then(response => {
                return response.data.source
            })
            .then(data => {
                this.props.clearCart(cart);
                browserHistory.push('/orderComplete');
            });
    }

    getData = () =>{
        this.props.cart.map(reservation => {
            this.props.products.map(product => {
                if (product.id === reservation.product_id) {
                    this.sum=this.sum + (product.price * 100)
                    const displayObj = {
                        reservationId: reservation.id,
                        photo:product.img_url,
                        product:product.name,
                        price:product.price,
                        date:reservation.date.slice(0, 10)
                    }
                    this.display.push(displayObj)
                }
            })
        })
        return this.display;
    }



    render(){
        const data = this.getData();
        return (
            <div className="col-md-10 signup-login">
                <h3>Here is your cart </h3>
                <form id="new-cart-form" className="form-group" style={{marginTop: '20px'}} >
                    <div>
                        <table className="table">
                            <thead>
                                <tr className="row">
                                    <th className="col-md-3"> Photo</th>
                                    <th className="col-md-3"> Product </th>
                                    <th className="col-md-3"> Price </th>
                                    <th className="col-md-3"> Date</th>
                                </tr>
                            </thead>
                            <tbody>
                        {data.map(dataObj => {
                            return(
                                    <tr key={dataObj.reservationId} className="row">
                                        <td className="col-md-3">
                                            <img className="cartImage" src={dataObj.photo}/>
                                        </td>
                                        <td className="col-md-3">{dataObj.product}</td>
                                        <td className="col-md-3">${dataObj.price}</td>
                                        <td className="col-md-3">{dataObj.date}</td>
                                    </tr>
                                )
                            }

                        )}
                            </tbody>
                        </table>
                    </div>
                    <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
                </form>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
                    amount={+this.sum}
                    currency="USD"
                />
            </div>
        )
    }


}



const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.reservations.cart,
        products: state.products.allProducts
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearCart: function(cart){
            dispatch(clearCart(cart))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
