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
                    {/*browserHistory.push('/products');*/}
                    }
                }>
                    <div>
                        {this.props.reservations.map(reservation => {
                            return(
                                <p key={reservation.id}>Here is the reservation ID (actually the categories ID): {reservation.id}</p>
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
        // const user = {
        //     firstName: e.target.firstName.value,
        //     lastName: e.target.lastName.value,
        //     email: e.target.email.value,
        //     password: e.target.password.value
        // }
        //
        console.log('got into confirmPurchase');
        let cart = this.props.reservations  //this is an array of objects
        axios.put('/api/reservations', cart)
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        reservations: state.categories.categories
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
