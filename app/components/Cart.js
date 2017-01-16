import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {browserHistory} from 'react-router';

class Cart extends Component{
    constructor(props){
        super(props)

        this.confirmPurchase = this.confirmPurchase.bind(this);

    }


    render(){
        return (
            <div className="col-md-10 signup-login">
                <h3>Here is your cart </h3>
                <form id="new-cart-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => {
                    this.confirmPurchase(e);
                    browserHistory.push('/products');
                    }
                }>
                    <div>
                        <div>
                            <div className="col-md-5"> Product ID</div>
                            <div className="col-md-5"> Reservation Date</div>
                        </div>
                        {this.props.cart.map(reservation => {
                            return(
                                <div key={reservation.id}>
                                    <div className="col-md-5">{reservation.product_id}</div>
                                    <div className="col-md-5">{reservation.date.slice(0, 10)}</div>
                                </div>
                                )

                        }

                        )}

                    </div>

                    <button id="cart-submit" type="submit" form="new-cart-form" value="Submit"
                            className="btn btn-primary btn-block">
                        <span className="glyphicon glyphicon-plus"></span> Submit Order
                    </button>
                    <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
                </form>
            </div>
        )
    }

    confirmPurchase(e){
        e.preventDefault();
        let cart = this.props.cart
        axios.put('/api/reservations', cart)
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.reservations.cart
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
