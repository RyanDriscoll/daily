import axios from 'axios'
import store from '../store'

const initialState = {
    allReservations: []
}
const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';



export const receiveReservation = reservation => ({
	type: RECEIVE_RESERVATION,
	reservation
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

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_RESERVATION:
      newState.allReservations.push(action.reservation)
      break;
    default:
      return state;
	}
	return newState;
}

export default reducer;