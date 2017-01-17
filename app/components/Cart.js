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
                            <div className="col-md-4"> Product Photo</div>
                            <div className="col-md-3"> Product Name</div>
                            <div className="col-md-3"> Reservation Date</div>
                        </div>
                        {this.props.cart.map(reservation => {
                            return(
                                <div key={reservation.id} className="row">
                                        {this.props.products.map(product => {
                                            if (product.id === reservation.product_id) {return (
                                                <div key={product.id}>
                                                    <div className="col-md-4">
                                                        <img className='cartImage' src={product.img_url}/>
                                                    </div>
                                                    <div className="col-md-3">{product.name}</div>
                                                </div>
                                            )}}
                                        )}
                                    <div className="col-md-3">{reservation.date.slice(0, 10)}</div>
                                    <br></br>
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
        cart: state.reservations.cart,
        products: state.products.allProducts
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
