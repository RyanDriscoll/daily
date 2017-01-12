import React , { Component } from 'react';
import AccountInfoForm from './AccountInfoForm';


export default class AccountInformationFormContainer extends Component {
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
        console.log('HANDLEINPUT:', e.target.name, e.target.value)
        // this.setState({firstName: e.target.value});x`
    }

        render(){
            console.log('state now', this.props);
            return(
                <AccountInfoForm handleInput={this.handleInput} userInfo={this.props}/>
            )
        }
}


