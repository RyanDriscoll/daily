import axios from 'axios'

const initialState = {
    categories: []
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			newState.categories = [...newState.categories, action.categories];
	}
	return newState;
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
    });
  };
};


export default reducer;