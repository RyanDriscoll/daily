import React from 'react';



export default function(props)  {
    return (
        <div className="account-info-container">
                    <form className="form-group account-info-form" onSubmit={props.handleSubmit}>
                            <div className="account-info-title">Account Information</div>

                             <label className="form-label"> E-mail </label>
                            <input name="email" type="email" className="form-control"
                            defaultValue={props.userInfo.email}
                            onChange={props.handleInput} readOnly></input>

                            <label className="form-label"> First Name </label>
                            <input name="firstName" type="text"
                            className="form-control"
                            defaultValue={props.userInfo.firstName}
                            onChange={props.handleInput}></input>

                            <label className="form-label"> Last Name </label>
                            <input name="lastName" type="text"
                            className="form-control"
                            defaultValue={props.userInfo.lastName}
                            onChange={props.handleInput}></input>

                             <label className="form-label"> Old password </label>
                            <input name="oldPassword" type="password"
                            className="form-control"
                            onChange={props.handleInput}></input>

                             <label className="form-label"> New password </label>
                            <input name="newPassword" type="password"
                            className="form-control"
                            onChange={props.handleInput}></input>

                             <label className="form-label"> Confirm New Password </label>
                            <input name="confirmNewPassword" type="password"
                            className="form-control"
                            onChange={props.handleInput}></input>


                            <button type="submit" className="btn btn-primary account-info-button">Save Changes</button>
                    </form>
        </div>
    )
}