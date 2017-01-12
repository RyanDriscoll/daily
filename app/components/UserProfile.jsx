

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
                <div className="header-section">
                    <div className="profile-img-container">
                        <img className="profile-img"></img>
                    </div>
                    <div className="profile-header-quote">
                        Some Quote goes here.
                    </div>
                </div>

                <div className="user-profile-container container container-fluid">
                    {/*<div className="col-sm-3 profile-nav-container">
                        <nav className="profile-nav">
                            <ul className="profile-nav-list">
                                <Link to={`/userProfile/${id}/accountInfo`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"> </i>
                                <span className="nav-link">Account Information</span>
                                </li></Link>

                                <Link style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-document nav-icon"></i>
                                <span className="nav-link"> Reservations </span>
                                </li></Link>

                                <Link to={`/userProfile/${id}/transactionHistory`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-document nav-icon"></i>
                                <span className="nav-link"> Transaction History </span>
                                </li></Link>
                                <Link style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"></i>
                                <span className="nav-link"> User Ratings </span>
                                </li></Link>
                                <Link style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"></i>
                                <span className="nav-link"> Pending Reviews </span>
                                </li></Link>
                                <Link style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-person-add nav-icon"></i>
                                <span className="nav-link"> Categories Management </span>
                                </li></Link>
                                 <Link style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-person-add nav-icon"></i>
                                <span className="nav-link"> User Management </span>
                                </li></Link>
                            </ul>
                        </nav>
                    </div>*/}
                    {this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props))}
                    {/*<AccountInfo userInfo={this.props.userInfo} />*/}


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

