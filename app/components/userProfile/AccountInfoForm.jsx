import React from 'react';



export default function(props)  {
    return (
        <div className="col-sm-9 account-info-container">
                    <form className="form-group account-info-form">
                            <div className="account-info-title">Account Information</div>
                            <label className="form-label"> First Name </label>
                            <input name="firstName" type="text" className="form-control" placeholder="Enter first name" value={props.userInfo.firstName} onChange={props.handleInput}></input>
                            <label className="form-label"> Last Name </label>
                            <input name="lastName" type="text" className="form-control" placeholder="Enter last name" value={props.userInfo.lastName}></input>
                             <label className="form-label"> Old password </label>
                            <input name="oldPassword" type="password" className="form-control"></input>
                             <label className="form-label"> New password </label>
                            <input name="newPassword" type="password" className="form-control"></input>
                             <label className="form-label"> Confirm New Password </label>
                            <input name="confirmNewPassword" type="password" className="form-control"></input>
                            <label className="form-label"> E-mail </label>
                            <input name="email" type="email" className="form-control" placeholder="Enter email" value={props.userInfo.email}></input>
                            <button type="submit" className="btn btn-primary account-info-button">Save Changes</button>
                    </form>
        </div>
    )
}