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

export const getUniqueAndSort = (arr) => {
  const seen = {};
  return arr.filter(item => {
    if (seen[item.name]) return;
    seen[item.name] = 1;
    return item;
  }).sort(function(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });
}

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