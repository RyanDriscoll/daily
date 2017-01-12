import axios from 'axios'

const initialState = {
    categories: []
}
const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';



export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
})

export const getCategories = () => {
  return dispatch => {
    axios.get(`/api/categories`)
    .then(response => {
      dispatch(receiveCategories(response.data));
    })
    .catch(err => console.error(err.stack));
  };
};

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			newState.categories = action.categories;
      break;
    default:
      return state;
	}
	return newState;
}

export default reducer;