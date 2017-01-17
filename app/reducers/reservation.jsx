import axios from 'axios'
import store from '../store'
import moment from 'moment'

const initialState = {
    cart: [],
    blockedDays: []
}
const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
const RECEIVE_BLOCKED_DAYS = 'RECEIVE_BLOCKED_DAYS';



export const receiveReservation = reservation => ({
	type: RECEIVE_RESERVATION,
	reservation
})

export const receiveBlockedDays = blockedDays => ({
  type: RECEIVE_BLOCKED_DAYS,
  blockedDays
})

export const makeReservation = (reservation, user, product) => {
    return dispatch => {
        axios.post(`/api/reservations`, {reservation, user, product})
            .then(response => {
                dispatch(receiveReservation(response.data));
            })
            .catch(err => console.error(err.stack))
    }
};

export const getReservationsForProduct = (productId) => {
  return dispatch => {
    axios.get(`/api/reservations/${productId}`)
    .then(response => response.data)
    .then(reservations => reservations.map(res => moment(res.date)))
    .then(dateArr => {
      dispatch(receiveBlockedDays(dateArr))
    })
    .catch(err => console.error(err.stack))
  }
}

const CLEAR_CART = 'CLEAR_CART';

export const clearCartSynchronousFunction = function (cart) {
    return{
        type: CLEAR_CART,
        cart
    }
}

export const clearCart = (cart) => {
    return dispatch => {
        axios.put('/api/reservations', cart)
            .then( response => {
                dispatch(clearCartSynchronousFunction(cart))
            })
            .catch(err => console.error(err.stack))
    }
}




const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_RESERVATION:
        newState.cart.push(action.reservation)
        break;
    case RECEIVE_BLOCKED_DAYS:
        newState.blockedDays = newState.blockedDays.concat(action.blockedDays)
        break;
    case CLEAR_CART:
        newState.cart=[];
        break;
    default:
        return state;
	}
	return newState;
}

export default reducer;