import React from 'react';
import { Link } from 'react-router'

export default function ({userId, isAdmin})  {
    return (
            <div className="profile-nav-container">
                        <nav className="profile-nav">
                            <ul className="profile-nav-list">
                                <Link to={`/userProfile/${userId}/accountInfo`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"> </i>
                                <span className="nav-link">Account Information</span>
                                </li></Link>

                                <Link to={`/userProfile/${userId}/futureReservations`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-document nav-icon"></i>
                                <span className="nav-link"> Reservations </span>
                                </li></Link>

                                <Link to={`/userProfile/${userId}/transactionHistory`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-document nav-icon"></i>
                                <span className="nav-link"> Transaction History </span>
                                </li></Link>
                                <Link to={`/userProfile/${userId}/aggregateRatings`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"></i>
                                <span className="nav-link"> User Ratings </span>
                                </li></Link>
                                <Link to={`/userProfile/${userId}/pendingReviews`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"></i>
                                <span className="nav-link"> Pending Reviews </span>
                                </li></Link>

                                <Link to={`/userProfile/${userId}/postedProducts`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-android-star-outline nav-icon"></i>
                                <span className="nav-link"> Posted Products</span>
                                </li></Link>

                                {isAdmin ?
                                <Link to={`/userProfile/${userId}/categoriesAdmin`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-person-add nav-icon"></i>
                                <span className="nav-link"> Categories  </span>
                                </li></Link>
                                : null }

                                {isAdmin ?
                                 <Link to={`/userProfile/${userId}/usersAdmin`} style={{textDecoration:'none'}}><li className="profile-nav-item"><i className="ion-person-add nav-icon"></i>
                                <span className="nav-link"> User Management </span>
                                </li></Link>
                                : null }



                            </ul>
                        </nav>
        </div>
    )
}