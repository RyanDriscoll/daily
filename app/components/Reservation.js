import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import { makeReservation } from '../reducers/reservation';
<<<<<<< HEAD
import axios from 'axios';
import moment from 'moment';
=======
import { store } from '../store';
import {browserHistory} from 'react-router';

>>>>>>> master

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null,
            focused: false,
            blockedDays: []
        }
    }

    componentDidMount() {
        // this.getBlockedDays();
        console.log('$$$$$$$$',this.props.selectedProduct.id);
        axios.get(`/api/reservations/${this.props.selectedProduct.id.toString()}`)
        .then(response => response.data)
        .then(reservations => reservations.map(res => moment(res.date)))
        .then(dateArr => {
            console.log(dateArr)
            this.setState({
            blockedDays: dateArr
        })})
    }

    // getBlockedDays() {
        // axios.get(`/api/reservations`)
        // .then(response => response.data)
        // .then(reservations => reservations.map(res => res.date))
        // .then(dateArr => {
        //     console.log(dateArr)
        //     this.setState({
        //     blockedDays: dateArr
        // })})
    // }

    render(){
        const product = this.props.selectedProduct;
        let user;
        if(this.props.auth){
            user = this.props.auth;
        }
        else{user = 'guest'};
        return(
            <div>
                <div>Reservation</div>
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
                        // isDayBlocked={(day) => }
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
        selectedProduct: state.products.selectedProduct
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addReservation: (reservation, user, product) => {
            dispatch(makeReservation(reservation, user, product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
