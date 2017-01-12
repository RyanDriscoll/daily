

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AccountInfoFormContainer from './userProfile/AccountInfoFormContainer.jsx';

import { getUserInfo, getRentedTransactions, getSoldTransactions, getAsRenterRatings, getAsSellerRatings } from 'APP/app/reducers/userProfile';


class UserProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
        this.aggregateRatings = this.aggregateRatings.bind(this);
    }

    componentDidMount(){
        const {id } = this.props.routeParams;
        //get user information
        this.props.getUserInfo(id);
        this.props.getRentedTransactions(id);
        this.props.getSoldTransactions(id);
        this.props.getAsRenterRatings(id);
        this.props.getAsSellerRatings(id);
    }

    aggregateRatings(ratings){
        if(ratings.length){
            const totalStars = ratings.reduce((sum,rating)=> sum + rating.stars, 0);
            return totalStars / ratings.length;
        }
        return 'No User Reviews';
    }

    render(){

        const aggregateRatingAsRenter = this.aggregateRatings(this.props.rentingRatings);
        const aggregateRatingAsSeller = this.aggregateRatings(this.props.sellingRatings);
        const {id} = this.props.routeParams;

        return (
            <div className="user-profile-page container container-fluid">
                <div className="col-md-10 header-section">
                    <div className="profile-img-container">
                        <img className="profile-img"></img>
                    </div>
                    <div className="profile-header-quote">
                        Some Text goes here.
                    </div>
                </div>

                <div className="user-profile-container container container-fluid">
                    {this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props))}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { userInfo, rentedTransactions, soldTransactions, rentingRatings, sellingRatings } = state.userProfile;
    return {
        userInfo,
        rentedTransactions,
        soldTransactions,
        rentingRatings,
        sellingRatings
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getRentedTransactions: (id) => dispatch(getRentedTransactions(id)),
        getSoldTransactions: (id) => dispatch(getSoldTransactions(id)),
        getAsRenterRatings: (id) => dispatch(getAsRenterRatings(id)),
        getAsSellerRatings: (id) => dispatch(getAsSellerRatings(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

