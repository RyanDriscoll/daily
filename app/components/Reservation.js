import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import { makeReservation, getReservationsForProduct } from '../reducers/reservation';
import axios from 'axios';
import moment from 'moment';
import { store } from '../store';
import {browserHistory} from 'react-router';
import ProductReview from './ProductReview.jsx'



class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null,
            focused: false,
            blockedDays: []
        }
    }


    render(){
        const product = this.props.selectedProduct;
        const blockedDays = this.props.blockedDays;
        let user;
        if(this.props.auth){
            user = this.props.auth;
        }
        else{user = 'guest'};
        return(
            <div className="col-xs-4">
                <ProductReview />
                <h1>Make a Reservation</h1>
                <form id="new-reservation-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => {
                    e.preventDefault();
                    const res = {
                        date: this.state.date._d,
                        status: 'carted'
                    }
                    this.props.addReservation(res, user, product)
                        window.setTimeout(function(){
                            browserHistory.push('/cart')}, 1000)
                    }

                }>

                    <SingleDatePicker
                        id="date_input"
                        date={this.state.date}
                        focused={this.state.focused}
                        onDateChange={(date) => { this.setState({ date }); }}
                        onFocusChange={({ focused }) => { this.setState({ focused }); }}
                        isDayBlocked={(day) => {
                            for (let i = 0; i < blockedDays.length; i++){
                                if (day.isSame(blockedDays[i], 'day')) {
                                    return true;
                                }
                            }
                        }}
                    />
                    <button id="reservation-submit" type="submit" form="new-reservation-form" value="Submit"
                            className="btn btn-primary btn-block">
                        <span className="glyphicon glyphicon-plus"></span> SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        selectedProduct: state.products.selectedProduct,
        blockedDays: state.reservations.blockedDays
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addReservation: (reservation, user, product) => {
            dispatch(makeReservation(reservation, user, product));
        },
        getBlockedDays: (productId) => {
            dispatch(getReservationsForProduct(productId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
