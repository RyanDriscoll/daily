import axios from 'axios';

const initialState = {
    userInfo: {},
    rentedTransactions: [],
    soldTransactions: [],
    rentingRatings: [],
    sellingRatings: []
}

/* ------ actions ------- */

const SET_USER_INFO = 'SET_USER_INFO';
const SET_RENTED_TRANSACTIONS = 'SET_RENTED_TRANSACTIONS';
const SET_SOLD_TRANSACTIONS = 'SET_SOLD_TRANSACTIONS';
const SET_RENTING_RATINGS = 'SET_RENTING_RATINGS';
const SET_SELLING_RATINGS = 'SET_SELLING_RATINGS';


/* ------ action creators ------ */
const setUserInfo = userInfo => ({ type: SET_USER_INFO, userInfo});
const setRentedTransactions = rentedTransactions => ({type: SET_RENTED_TRANSACTIONS, rentedTransactions});
const setSoldTransactions = soldTransactions => ({type: SET_SOLD_TRANSACTIONS, soldTransactions});
const setSellingRatings = sellingRatings => ({type: SET_SELLING_RATINGS, sellingRatings});
const setRentingRatings = rentingRatings => ({type: SET_RENTING_RATINGS, rentingRatings});


/* ------  set user info reducer ------ */
export default function setUserInfoReducer (prevState = initialState, action){
    let nextState = Object.assign({}, prevState);
    switch(action.type){
        case SET_USER_INFO:
            nextState.userInfo = action.userInfo;
            return nextState;
        case SET_RENTED_TRANSACTIONS:
            nextState.rentedTransactions = action.rentedTransactions;
            return nextState;
        case SET_SOLD_TRANSACTIONS:
            nextState.soldTransactions = action.soldTransactions;
            return nextState;
        case SET_RENTING_RATINGS:
            nextState.rentingRatings = action.rentingRatings;
            return nextState;
        case SET_SELLING_RATINGS:
            nextState.sellingRatings = action.sellingRatings;
            return nextState;
        default:
            return prevState;
    }
};

/* ------ dispatchers ------- */
export const getUserInfo = (id) => dispatch => {
    axios.get(`/api/userProfile/id/${id}`)
    .then((res)=> {
        console.log(`retrieving user info: ${JSON.stringify(res)}`)
        dispatch(setUserInfo(res.data))
    })
    .catch( err => console.error(`setting user info unsuccessful: ${err}`));
};

export const getRentedTransactions = (id) => dispatch => {
    axios.get(`/api/userProfile/reservations/asRenter/${id}`)
    .then((res)=> {
           console.log(`retrieving renter transactions: ${JSON.stringify(res)}`);
           dispatch(setRentedTransactions(res.data));
    })
    .catch( err => console.error(`setting renter transactions unsuccessful: ${err}`));
}

export const getSoldTransactions = (id) => dispatch => {
    axios.get(`/api/userProfile/reservations/asSeller/${id}`)
    .then((res)=> {
         console.log(`retrieving seller transactions: ${JSON.stringify(res)}`);
         dispatch(setSoldTransactions(res.data));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

export const getAsRenterRatings = (id) => dispatch => {
    axios.get(`/api/userProfile/ratings/asRenter/${id}`)
    .then((res)=> {
        console.log(`retrieving ratings as renter: ${JSON.stringify(res)}`);
        dispatch(setRentingRatings(res.data));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

export const getAsSellerRatings = (id) => dispatch => {
    axios.get(`/api/userProfile/ratings/asSeller/${id}`)
    .then((res)=> {
        console.log(`retrieving ratings as seller: ${JSON.stringify(res)}`);
        dispatch(setSellingRatings(res.data));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

