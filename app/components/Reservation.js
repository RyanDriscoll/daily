import React, {Component} from 'react';
import { connect } from 'react-redux';


class Reservation extends Component {
    constructor(props) {
        super(props)
        const product = props.selectedProduct;
        let user;
        if(props.auth){
            user = props.auth;
        }
        else{user = 'guest'};
    }

    render(){
        return(
            <div>
                <div>Reservation</div>
                <form id="new-reservation-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => props.addReservation(e)}>
                    <input
                        type="date"
                        name="reservation-date"
                        className="form-control"
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
        selectedProduct: state.selectedProduct
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
