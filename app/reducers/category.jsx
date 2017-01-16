import axios from 'axios'

const initialState = {
    categories: []
}
const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';



export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
})

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const removeCategory = categoryId => ({
  type: REMOVE_CATEGORY,
  categoryId
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

export const postCategory = (categoryName) => dispatch => {
  axios.post(`/api/categories`, {name: categoryName})
  .then(response => {
      dispatch(addCategory(response.data[0]));
  })
  .catch(err => console.error(err.stack));
}

export const deleteCategory = (categoryId) => dispatch => {
  axios.delete(`/api/categories/${categoryId}`)
  .then(response => {
      console.log(`response from delete category: ${JSON.stringify(response)}`);
      if(response.status==='200'){
        dispatch(removeCategory(categoryId));
      }
  })
  .catch(err => console.error(err.stack));
}


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
    case ADD_CATEGORY:
      newState.categories = [...newState.categories, action.category]
      break;
    case REMOVE_CATEGORY:
      console.log('remove category reducer');
      break;
    default:
      return state;
	}
	return newState;
}

export default reducer;