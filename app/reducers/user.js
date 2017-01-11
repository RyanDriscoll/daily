import axios from 'axios'

const initialState = {
    allUsers: []
}

const SIGNUP = 'SIGNUP'
export const signup = (user) =>
    dispatch =>
        axios.post('/api/users', user)
            .then(response => console.log('in user reducer, here is response', response))
            .then(() => dispatch({type: SIGNUP, user: user}))

export default function(state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case SIGNUP:
            newState.allUsers = [...newState.allUsers, action.user];
            break;
        default:
            return state;
    }
    return newState;
}