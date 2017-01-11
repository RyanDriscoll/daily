

import React, { Component } from 'react';
import { connect } from 'react-redux';

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

        return (
            <div className="userProfileContainer">
                <div> Add Category Section </div>
                <div className="userContainer">
                    <div> First Name </div>
                    <label>{this.props.userInfo.firstName}</label>
                    <div> Last Name </div>
                    <label>{this.props.userInfo.lastName}</label>
                    <div> Email </div>
                    <label> {this.props.userInfo.email}</label>
                </div>
                <div className="transactionContainer">
                    <div>
                        <div> Rented History </div>
                        {this.props.rentedTransactions.map(transaction => {
                             return( <div>
                                <span>Product Name: {transaction.product.name} </span>
                                <span>Product description: {transaction.product.description}</span>
                                <span>Address: {transaction.product.address} </span>
                                <span> City: {transaction.product.city} </span>
                                <span> State: {transaction.product.state} </span>
                                <span> Zip: {transaction.product.zip} </span>
                                <span> Price: {transaction.product.price} </span>
                            </div>)
                        })}
                    </div>
                    <div>
                        <div> Sold History </div>
                        {this.props.soldTransactions.map(transaction => {
                            return( <div>
                                <span>Product Name: {transaction.product.name} </span>
                                <span>Product description: {transaction.product.description}</span>
                                <span>Address: {transaction.product.address} </span>
                                <span> City: {transaction.product.city} </span>
                                <span> State: {transaction.product.state} </span>
                                <span> Zip: {transaction.product.zip} </span>
                                <span> Price: {transaction.product.price} </span>
                            </div>)
                        })}
                    </div>

                    <div>
                        <div> Aggregate Seller Rating </div>
                        <div> {aggregateRatingAsSeller}</div>
                        <div> Aggregate Renter Rating </div>
                        <div> {aggregateRatingAsRenter}</div>


                    </div>

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

