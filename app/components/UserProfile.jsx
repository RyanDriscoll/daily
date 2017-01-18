

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AccountInfoFormContainer from './userProfile/AccountInfoFormContainer.jsx';

import { getUserInfo,
    getRentedTransactions,
    getSoldTransactions,
    getAsRenterRatings,
    getAsSellerRatings,
    getAsRenterPendingReview,
    getAsSellerPendingReview } from 'APP/app/reducers/userProfile';


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
        this.props.getAsRenterPendingReview(id);
        this.props.getAsSellerPendingReview(id);
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
            <div className="col-md-10 user-profile-page container container-fluid" style={{padding: 0}}>
                <div className="header-section">
                    <div className="profile-header-quote">
                        Welcome back to Dai.ly
                    </div>
                </div>

                <div className="col-md-12 user-profile-container container container-fluid" >
                    {this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props))}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { userInfo, rentedTransactions, soldTransactions,
        pendingRentTransactions, pendingSellTransactions, rentingRatings, sellingRatings,
    pendingAsRenterReview, pendingAsSellerReview } = state.userProfile;
    const { categories } = state.categories;
    return {
        userInfo,
        rentedTransactions,
        soldTransactions,
        pendingRentTransactions,
        pendingSellTransactions,
        rentingRatings,
        sellingRatings,
        pendingAsRenterReview,
        pendingAsSellerReview,
        categories

    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        getRentedTransactions: (id) => dispatch(getRentedTransactions(id)),
        getSoldTransactions: (id) => dispatch(getSoldTransactions(id)),
        getAsRenterRatings: (id) => dispatch(getAsRenterRatings(id)),
        getAsSellerRatings: (id) => dispatch(getAsSellerRatings(id)),
        getAsRenterPendingReview: (id) => dispatch(getAsRenterPendingReview(id)),
        getAsSellerPendingReview: (id) => dispatch(getAsSellerPendingReview(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

