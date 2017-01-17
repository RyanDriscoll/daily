import axios from 'axios';

const initialState = {
    users: []
}

/* ------ actions ------- */

const SET_ALL_USERS = 'SET_ALL_USERS';
const CHANGE_USER_ADMIN_STATUS = 'CHANGE_USER_ADMIN_STATUS';
const REMOVE_USER = 'REMOVE_USER';

/* ------- action creator ------ */

const setAllUsers = users => ({type: SET_ALL_USERS, users});
const changeUserAdminStatus = user => ({type: CHANGE_USER_ADMIN_STATUS, user});
const removeUser = userId => ({type: REMOVE_USER, userId});


/* ------- reducer ------- */

export default (prevState = initialState, action) => {

    let nextState = Object.assign({}, prevState);
    let index;
    switch (action.type){
        case SET_ALL_USERS:
            nextState.users = action.users;
            return nextState;
        case CHANGE_USER_ADMIN_STATUS:
            nextState.users.forEach((user, i)=> {
                if(user.id===action.user.id){
                    index = i;
                }
            });
            nextState.users = [...nextState.users.slice(0, index), action.user, ...nextState.users.slice(index+1, nextState.users.length)]
            return nextState;
        case REMOVE_USER:
            nextState.users.forEach((user, i)=> {
                if(user.id===action.userId){
                    index = i;
                }
            });
            nextState.users = [...nextState.users.slice(0, index), ...nextState.users.slice(index+1, nextState.users.length)]
            return nextState;
        default:
            return prevState;
    }
}


/* ------- dispatchers ------- */

export const getAllUsers = () => dispatch => {
    axios.get(`/api/users`)
    .then(res => {
        dispatch(setAllUsers(res.data));
    })
    .catch( err => console.error(`retrieve all users info unsuccessful, ${err}`));
}

export const toggleAdminStatus = (userId) => dispatch => {
    axios.put(`/api/users/${userId}/admin`)
    .then(res => {
        dispatch(changeUserAdminStatus(res.data));
    })
    .catch( err => console.error(`toggle admin status for user unsuccessful, ${err}`));
}

export const deleteUser = (userId) => dispatch => {
    axios.delete(`/api/users/${userId}/`)
    .then(res => {
        if(res.data === 1){
            dispatch(removeUser(userId));
        }
    })
    .catch(err=> console.error(`delete user unsuccessful, ${err}`));
}

