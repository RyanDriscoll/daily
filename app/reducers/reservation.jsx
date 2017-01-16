import axios from 'axios'

const initialState = {
    reservations: []
}
const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';



export const receiveReservation = reservation => ({
	type: RECEIVE_RESERVATION,
	reservation
})

export const makeReservation = (reservation, userId, productId) => {
  return dispatch => {
    axios.post(`/api/reservations`, {reservation, userId, productId})
    .then(response => {
      dispatch(receiveReservation(response.data));
    })
    .catch(err => console.error(err))
  }
};

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_RESERVATION:
			newState.reservations = newState.reservations.push(action.reservation);
      break;
    default:
      return state;
	}
	return newState;
}

export default reducer;