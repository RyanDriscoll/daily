import React, {Component}  from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password_digest: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logInUser = this.logInUser.bind(this);
    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return (
            <div className="col-md-10 signup-login">
            <h3>Welcome to Daily! </h3>
            <h4>Log in below.</h4>
            <form id="login-form" className="form-group" style={{marginTop: '20px'}} onSubmit={evt => {
                evt.preventDefault();
                this.props.login(evt.target.email.value, evt.target.password_digest.value);
                this.logInUser(evt);
            } }>
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
                <button id="login-submit" type="submit" form="login-form" value="Submit"
                        className="btn btn-primary btn-block">
                    <span className="glyphicon glyphicon-plus"></span> Log me in
                </button>
                <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
            </form>
            </div>
        )
    }

    logInUser(e){
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password_digest: e.target.password_digest.value
        }

        // this.props.login(user);

        this.setState({
            email: '',
            password_digest: ''
        })
    }
}


const mapStateToProps = (state, ownProps) => {
    return {};
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: function(username, password){
            console.log('mptp login', username, password)
            dispatch(login(username, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


