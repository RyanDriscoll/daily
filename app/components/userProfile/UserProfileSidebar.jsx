import React from 'react';
import { Link } from 'react-router'

export default function ({userId})  {
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
        </div>
    )
}