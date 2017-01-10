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
            <div>
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

// export const Login = ({ login }) => (
//   <form onSubmit={evt => {
//     evt.preventDefault();
//     login(evt.target.username.value, evt.target.password.value)
//   } }>
//     <input name="username" />
//     <input name="password" type="password" />
//     <input type="submit" value="Login" />
//   </form>
// )
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


// export default connect (
//   state => ({}),
//   {login},
// ) (Login)




//
// class Signup extends Component{
//     constructor(props){
//         super(props)
//
//         this.state = {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password_digest: ''
//         }
//
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.signUpUser = this.signUpUser.bind(this);
//
//     }
//
//     handleInputChange(e){
//         this.setState({[e.target.name]:e.target.value});
//     }
//
//     render(){
//         return (
//             <div>
//                 <h3>Welcome to Daily! </h3>
//                 <h4>Sign up below to create an account.</h4>
//                 <form id="new-signup-form" className="form-group" style={{marginTop: '20px'}} onSubmit={e => this.signUpUser(e)}>
//                     <input
//                         id="first-name-input"
//                         name="firstName"
//                         className="form-control"
//                         placeholder="Enter first name"
//                         onChange={e => this.handleInputChange(e)}
//                         value={this.state.firstName}
//                     />
//                     <input
//                         id="last-name-input"
//                         name="lastName"
//                         className="form-control"
//                         placeholder="Enter last name"
//                         onChange={e => this.handleInputChange(e)}
//                         value={this.state.lastName}
//                     />
//                     <input
//                         id="email-input"
//                         name="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         onChange={e => this.handleInputChange(e)}
//                         value={this.state.email}
//                     />
//                     <input
//                         id="password_digest-input"
//                         name="password_digest"
//                         className="form-control"
//                         placeholder="Enter password)"
//                         onChange={e => this.handleInputChange(e)}
//                         value={this.state.password_digest}
//
//                     />
//                     <button id="signup-submit" type="submit" form="new-signup-form" value="Submit"
//                             className="btn btn-primary btn-block">
//                         <span className="glyphicon glyphicon-plus"></span> Sign me up
//                     </button>
//                     <div id="alert-warning" hidden="true" className="alert alert-warning">Please enter a valid name</div>
//                 </form>
//             </div>
//         )
//     }
//
//     signUpUser(e){
//         e.preventDefault();
//         const user = {
//             firstName: e.target.firstName.value,
//             lastName: e.target.lastName.value,
//             email: e.target.email.value,
//             password_digest: e.target.password_digest.value
//         }
//
//         this.props.signup(user);
//
//         this.setState({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password_digest: ''
//         })
//     }
//
// }
//
//
// const mapStateToProps = (state, ownProps) => {
//     return {};
// }
//
//
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         signup: function(user){
//             dispatch(signup(user));
//         }
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
