import axios from 'axios'

const initialState = {
    allProducts: [],
    selectedProduct: {}
}
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

/*-----action-creator products-----*/
export const receiveProducts = (products) =>{
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  }
}


const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'

/*-----action-creator single products-----*/
export const receiveProduct = (product) =>{
  return {
    type: RECEIVE_PRODUCT,
    product: product
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
        console.error(err)
      })

}

/*-----gets a single product-----*/
export const getSingleProduct = (productId) =>dispatch=>{
  axios.get(`/api/products/${productId}`)
      .then(response => {
      return  response.data}
      )
      .then((product) => {
        return dispatch(receiveProduct(product))}
    )
      .catch(function(err){
        console.error(err)
      })

}

/*-----products reducer-----*/
export const postProduct = (product) => {
  return dispatch => {
  axios.post(`/api/products`, product)
  .then(response => response.data)
  .catch(err => console.error(err))
  }
}


/*-----products reducer-----*/
export default function(state = initialState, action) {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            newState.allProducts =  action.products;
            break;

        case RECEIVE_PRODUCT:
          newState.selectedProduct = action.product
          break;

        default:
            return state;
    }
    return newState;
}
