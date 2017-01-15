import axios from 'axios';

const initialState = {
    userInfo: {},
    rentedTransactions: [],
    soldTransactions: [],
    pendingRentTransactions: [],
    pendingSellTransactions: [],
    rentingRatings: [],
    sellingRatings: [],
    pendingAsRenterReview: [],
    pendingAsSellerReview: []
}

/* ------ actions ------- */

const SET_USER_INFO = 'SET_USER_INFO';
const SET_RENTED_TRANSACTIONS = 'SET_RENTED_TRANSACTIONS';
const SET_SOLD_TRANSACTIONS = 'SET_SOLD_TRANSACTIONS';
const SET_PENDING_RENT_TRANSACTIONS = 'SET_PENDING_RENT_TRANSACTIONS';
const SET_PENDING_SELL_TRANSACTIONS = 'SET_PENDING_SELL_TRANSACTIONS';
const SET_RENTING_RATINGS = 'SET_RENTING_RATINGS';
const SET_SELLING_RATINGS = 'SET_SELLING_RATINGS';
const SET_AS_RENTER_REVIEW = 'SET_AS_RENTER_REVIEW';
const SET_AS_SELLER_REVIEW = 'SET_AS_SELLER_REVIEW';

/* ------ action creators ------ */
const setUserInfo = userInfo => ({ type: SET_USER_INFO, userInfo});
const setRentedTransactions = rentedTransactions => ({type: SET_RENTED_TRANSACTIONS, rentedTransactions});
const setSoldTransactions = soldTransactions => ({type: SET_SOLD_TRANSACTIONS, soldTransactions});
const setPendingRentTransactions = pendingRentTransactions => ({type: SET_PENDING_RENT_TRANSACTIONS, pendingRentTransactions});
const setPendingSellTransactions = pendingSellTransactions => ({type: SET_PENDING_SELL_TRANSACTIONS, pendingSellTransactions});
const setSellingRatings = sellingRatings => ({type: SET_SELLING_RATINGS, sellingRatings});
const setRentingRatings = rentingRatings => ({type: SET_RENTING_RATINGS, rentingRatings});
const setAsRenterReview = reviews => ({type: SET_AS_RENTER_REVIEW, reviews});
const setAsSellerReview = reviews => ({type: SET_AS_SELLER_REVIEW, reviews});


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
        case SET_PENDING_RENT_TRANSACTIONS:
            nextState.pendingRentTransactions = action.pendingRentTransactions;
            return nextState;
        case SET_PENDING_SELL_TRANSACTIONS:
            nextState.pendingSellTransactions = action.pendingSellTransactions;
            return nextState;
        case SET_RENTING_RATINGS:
            nextState.rentingRatings = action.rentingRatings;
            return nextState;
        case SET_SELLING_RATINGS:
            nextState.sellingRatings = action.sellingRatings;
            return nextState;
        case SET_AS_RENTER_REVIEW:
            nextState.pendingAsRenterReview = action.reviews;
            return nextState;
        case SET_AS_SELLER_REVIEW:
            nextState.pendingAsSellerReview = action.reviews;
            return nextState;
        default:
            return prevState;
    }
};

/* ------ dispatchers ------- */

export const getUserInfo = (id) => dispatch => {
    axios.get(`/api/userProfile/${id}`)
    .then((res)=> {
        console.log(`retrieving user info: ${JSON.stringify(res)}`)
        dispatch(setUserInfo(res.data))
    })
    .catch( err => console.error(`setting user info unsuccessful: ${err}`));
};


export const updateUserInfo = (updateInfo) => dispatch => {
    axios.put(`/api/userProfile/`, updateInfo)
    .then((res)=> {
        alert('update successful');
        dispatch(setUserInfo(res.data))
    })
    .catch( err => {
        alert('password is incorrect');
        console.error(`updating user info unsuccessful: ${err}`)});
};

/* filter out pending and past transactions */
export const getRentedTransactions = (id) => dispatch => {
    axios.get(`/api/reservations/renter/${id}`)
    .then((res)=> {
           console.log(`retrieving renter transactions: ${JSON.stringify(res)}`);
            const pendingReservations = res.data.filter(reservation => reservation.pendingReservation);
            dispatch(setPendingRentTransactions(pendingReservations));
            const pastReservations = res.data.filter(reservation => reservation.fulfilled);
            dispatch(setRentedTransactions(pastReservations));
    })
    .catch( err => console.error(`setting renter transactions unsuccessful: ${err}`));

}

/* filter out pending and past transactions */
export const getSoldTransactions = (id) => dispatch => {
    axios.get(`/api/reservations/seller/${id}`)
    .then((res)=> {
         console.log(`retrieving seller transactions: ${JSON.stringify(res)}`);
            const pendingSellingTransactions = res.data.filter(transaction => transaction.pendingReservation);
            dispatch(setPendingSellTransactions(pendingSellingTransactions));
            const soldTransactions = res.data.filter(transaction => transaction.fulfilled);
            dispatch(setSoldTransactions(soldTransactions));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}


export const getAsRenterRatings = (id) => dispatch => {
    axios.get(`/api/ratings/renter/${id}`)
    .then((res)=> {
        console.log(`retrieving ratings as renter: ${JSON.stringify(res.data)}`);
            const rentingRatings = res.data.filter(reservation => reservation.renterReview );
            dispatch(setRentingRatings(rentingRatings));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

export const getAsSellerRatings = (id) => dispatch => {
    axios.get(`/api/ratings/seller/${id}`)
    .then((res)=> {
        console.log(`retrieving ratings as seller: ${JSON.stringify(res.data)}`);
        const sellingRatings = res.data.filter(reservation => reservation.sellerReview);
        dispatch(setSellingRatings(sellingRatings));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

export const getAsRenterPendingReview = (id) => dispatch => {
    axios.get(`/api/ratings/renter/${id}/pending`)
    .then((res)=> {
        console.log(`retrieving AS RENTER PENDING REVIEW: ${JSON.stringify(res.data)}`);
        const asRenterPendingReview = res.data.filter(reservation => {
            return reservation.fulfilled && !reservation.sellerReview;
        })
        dispatch(setAsRenterReview(asRenterPendingReview));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}

export const getAsSellerPendingReview = (id) => dispatch => {
    axios.get(`/api/ratings/seller/${id}/pending`)
    .then((res)=> {
        console.log(`retrieving AS SELLER PENDING REVIEW: ${JSON.stringify(res.data)}`);
        const asSellerPendingReview = res.data.filter(reservation => {
            return reservation.fulfilled && !reservation.renterReview;
        })
        dispatch(setAsSellerReview(asSellerPendingReview));
    })
    .catch( err => console.error(`setting sold transactions unsuccessful: ${err}`));
}













