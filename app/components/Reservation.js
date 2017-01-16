import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';
import { makeReservation } from '../reducers/reservation';

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null,
            focused: false
        }
    }

    render(){
        console.log('props', this.props);
        console.log('state', this.state);
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
                    }
                }>

                    <SingleDatePicker
                        id="date_input"
                        date={this.state.date}
                        focused={this.state.focused}
                        onDateChange={(date) => { this.setState({ date }); }}
                        onFocusChange={({ focused }) => { this.setState({ focused }); }}
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
            console.log("^^^^^^^^^", reservation, user, product);
            dispatch => dispatch(makeReservation(reservation, user, product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
