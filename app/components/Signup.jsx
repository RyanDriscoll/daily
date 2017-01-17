import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {login} from 'APP/app/reducers/auth'


class Signup extends Component{
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.signUpUser = this.signUpUser.bind(this);

    }

    handleInputChange(e){
            this.setState({[e.target.name]:e.target.value});
    }

    render(){
            return (
                <div className="col-md-10 signup-login">
                    <h3>Welcome to Daily! </h3>
                    <h4>Sign up below to create an account.</h4>
                    <form id="new-signup-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => {
                        this.signUpUser(e);
                        browserHistory.push('/products');
                        }
                    }>
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
                            id="password-input"
                            name="password"
                            className="form-control"
                            placeholder="Enter password)"
                            onChange={e => this.handleInputChange(e)}
                            value={this.state.password}

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
        const user = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        axios.post('/api/users', user)
        .then(() => this.props.login(this.state.email, this.state.password))

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

}


const mapStateToProps = (state, ownProps) => {
    return {};
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: function(username, password){
            dispatch(login(username, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);



