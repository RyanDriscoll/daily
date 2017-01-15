import React , { Component } from 'react';
import AccountInfoForm from './AccountInfoForm';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../reducers/userProfile'

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.oldPassword===''){
            alert('Please fill in old password');
        }
        else if(this.state.newPassword!=='' && this.state.confirmNewPassword!==this.state.newPassword){
            alert('new password did not match');
        }
        else if(this.state.newPassword==='' && this.state.firstName==='' && this.state.lastName===''){
            alert('Please specify account information you would like to update');
        }
        else {
            let updateInfo = {id: this.props.userInfo.id};
            for(var key in this.state){
                if(this.state[key]!==''){
                    updateInfo[key] = this.state[key];
                }
            }
            this.props.updateUserInfo(updateInfo);
        }
    }

        render(){
            return(
                <AccountInfoForm
                handleInput={this.handleInput}
                userInfo={this.props.userInfo}
                handleSubmit={this.handleSubmit}/>
            )
        }
}



const mapStateToProps = (state, ownProps) => {
    return {};
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUserInfo: (user) => dispatch(updateUserInfo(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountInformationFormContainer);


