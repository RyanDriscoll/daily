import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllUsers, toggleAdminStatus, deleteUser } from '../../reducers/users.jsx';

class UsersAdmin extends Component {

    constructor(props){
        super(props);

        this.toggleAdminStatus = this.toggleAdminStatus.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        this.props.getAllUsers();
    }

    toggleAdminStatus(userId){
        this.props.toggleAdminStatus(userId);
    }

    deleteUser(userId){
        this.props.deleteUser(userId);
    }

    render(){
        return (
            <div className="user-admin-container">
                    <table className = "table table-striped">
                        <caption className="user-admin-caption">Users</caption>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name </th>
                                <th>E-mail</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                           {this.props.users.map(user=> {
                             return (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    {user.isAdmin ?
                                    <button
                                    onClick={()=> {this.toggleAdminStatus(user.id)}}
                                    className="btn btn-info"> Admin </button>
                                    :
                                    <button
                                    onClick={()=> {this.toggleAdminStatus(user.id)}}
                                    className="btn btn-default"> User </button>}
                                    <button
                                    onClick={()=> {this.deleteUser(user.id)}}
                                    className="btn btn-danger">
                                    X</button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>

                    </table>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { users } = state.users;
    return {
        users
    };
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllUsers: () => {dispatch(getAllUsers())},
        toggleAdminStatus: (userId) => {dispatch(toggleAdminStatus(userId))},
        deleteUser: (userId) => {dispatch(deleteUser(userId))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersAdmin);