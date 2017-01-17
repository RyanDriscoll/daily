import axios from 'axios'

const initialState = {
    allProducts: [],
    selectedProduct: {},
    selectedProductRatings:[]
}
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

/*-----action-creator products-----*/
export const receiveProducts = (products) =>{
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  }
}


const RECEIVE_PRODUCT_RATINGS = 'RECEIVE_PRODUCT_RATINGS'

export const receiveProductRatings = (ratings)=>{
  return {
    type: RECEIVE_PRODUCT_RATINGS,
    ratings: ratings
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


export const getProductReview = (productId)=>{
  return dispatch => {
  axios.get(`/api/products/${productId}/reviews`)
    .then(response=>{
      console.log("RDATA", response.data)
      return response.data})
    .then(reviews=>{
      console.log("IN GPR", reviews)
      let newReviews = reviews.map(reviewObj=>{
        return reviewObj.sellerReview
      })
      console.log("REVIEW ARR", reviews)
      return dispatch(receiveProductRatings(newReviews))
    })
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

        case RECEIVE_PRODUCT_RATINGS:
          newState.selectedProductRatings = action.ratings
          break;

        default:
            return state;
    }
    return newState;
}
