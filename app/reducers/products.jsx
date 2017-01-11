import axios from 'axios'

const initialState = {
    allProducts: []
}
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

/*-----action-creator-----*/
export const receiveProducts = (products) =>{
  return {
    type: RECEIVE_PRODUCTS,
    allProducts: products
  }
}


/*-----gets all products-----*/
export const getProducts = () =>dispatch=>{
  axios.get('/api/products')
      .then(response => {
      return  response.data}
      )
      .then((products) => {
        return dispatch(receiveProducts(products))}
    )
      .catch(function(err){
        console.log(err)
      })

}


/*-----products reducer-----*/
export default function(state = initialState, action) {
  console.log("PRODUCT ACTION", action.type )
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            newState.allProducts =  action.allProducts;
            break;
        default:
            return state;
    }
    return newState;
}
