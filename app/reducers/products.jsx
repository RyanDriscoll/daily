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



const SET_PRODUCT_ACTIVE_FALSE = 'SET_PRODUCT_ACTIVE_FALSE'

/*-----action-creator remove product by user ----- */
export const setProductActiveFalse= (productId) => {
  return {
    type: SET_PRODUCT_ACTIVE_FALSE,
    productId
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



/*---- delete product ------ */
export const deleteProduct = (productId) => dispatch => {
  axios.delete(`/api/products/${productId}`)
    .then(response => {
      console.log(`delete a product, ${response.data}`);
      if(response.data){
        dispatch(setProductActiveFalse(productId));
      }
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

/*-----post a product-----*/
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
      return response.data})
    .then(reviews=>{

      let newReviews = reviews.filter(reviewObj=>{
        if (reviewObj.renterReview) {
          return true
        }
        console.log("NEW REVIEWS", newReviews)
      })
      return dispatch(receiveProductRatings(newReviews))
    })
      .catch(err => console.error(err))
  }
}


/*-----products reducer-----*/
export default function(state = initialState, action) {
    let newState = Object.assign({}, state)
    let index;
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            newState.allProducts =  action.products;
            break;

        case RECEIVE_PRODUCT:
          newState.selectedProduct = action.product
          break;


        case SET_PRODUCT_ACTIVE_FALSE:
          let length = newState.allProducts.length;
          index = newState.allProducts.findIndex(product=> product.id===action.productId);
          newState.allProducts = [...newState.allProducts.slice(0,index), Object.assign({}, newState.allProducts[index], {active: false}), ...newState.allProducts.slice(index+1, length)]
          break;

        case RECEIVE_PRODUCT_RATINGS:
          newState.selectedProductRatings = action.ratings
          break;

        default:
            return state;
    }
    return newState;
}
