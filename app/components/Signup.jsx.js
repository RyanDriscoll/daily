import React, {Component} from 'react';
import { connect } from 'react-redux';

import {signup} from 'APP/app/reducers/user';

// import {addLatLongToDb, validateAddress} from '../../actions/addressDetails'

class Signup extends Component{
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password_digest: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.signUpUser = this.signUpUser.bind(this);

    }

    handleInputChange(e){
            this.setState({[e.target.name]:e.target.value});
    }

    render(){
        // return (<Signup allInterests={this.props.allInterests} handleInputChange={this.handleInputChange} signUpUser={this.signUpUser} {...this.state} handleAddress={this.handleAddress}/>)
        // import React, { Component } from 'react';
        // import InterestOptions from './InterestOptions';
            return (
                <div>
                    <h3>Welcome to Daily! </h3>
                    <h4>Sign up below to create an account.</h4>
                    <form id="new-signup-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => this.signUpUser(e)}>
                        <input
                            id="first-name-input"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter first name"
                            onChange={e => this.handleInputChange(e)}
                            value={this.state.firstName}
                        />
                        <input
                            id="last-name-input"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter last name"
                            onChange={e => this.handleInputChange(e)}
                            value={this.state.lastName}
                        />
                        <input
                            id="email-input"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={e => this.handleInputChange(e)}
                            value={this.state.email}
                        />
                        <input
                            id="password_digest-input"
                            name="password_digest"
                            className="form-control"
                            placeholder="Enter password)"
                            onChange={e => this.handleInputChange(e)}
                            value={this.state.password_digest}

                        />
                        <button id="signup-submit" type="submit" form="new-signup-form" value="Submit"
                                className="btn btn-primary btn-block">
                            <span className="glyphicon glyphicon-plus"></span> Sign me up
                        </button>
                        <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
                    </form>
                </div>
            )
        }

    signUpUser(e){
        e.preventDefault();
        // console.log('...........this.state.interests', this.state.interests)
        const user = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password_digest: e.target.password_digest.value
        }

        // Promise.all([
        //     this.props.addUToDb(user)
        // ]).then(() => {
        //     this.props.router.push('/');
        // });

        this.props.signup(user);

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password_digest: ''
        })
    }

}


const mapStateToProps = (state, ownProps) => {
    // console.log('-----------> Signup Container state', state)
    return {
        // currentView: state.currentView,
        // allInterests: state.interests.allInterests
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signup: function(user){
            dispatch(signup(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);



