import React , { Component } from 'react';
import AccountInfoForm from './AccountInfoForm';
import { connect } from 'react-redux';

class AccountInformationFormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            email: ''
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('submitt button clicked')
    }

        render(){
            return(
                <AccountInfoForm
                handleInput={this.handleInput}
                userInfo={this.props.userInfo}
                {...this.state}
                handleSubmit={this.handleSubmit}/>
            )
        }
}



const mapStateToProps = (state, ownProps) => {
    return {};
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountInformationFormContainer);


