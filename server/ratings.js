'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User , Reservation , Review , Product } = require('APP/db/models');

const router = require('express').Router();


router.param('userId', (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
    .then(user=> {
        if(!user) res.send(404);
        else {
            req.loggedInUser = user;
            next();
        }
    })
});

/* post a rating */
router.post('/', (req, res, next) => {
    const { reservationId, stars, text, type } = req.body;
  Promise.all([Reservation.findById(reservationId),
            Review.create({stars:stars, text:text})])
   .then(([reservation, review]) => {
       console.log('TYPE:', type);
       if(type==='sellerReview'){
        reservation.setSellerReview(review);
       }
       else if(type==='renterReview'){
           reservation.setRenterReview(review);
       }
        res.send(reservation);
   });
});


/* get all as renter ratings */
router.get('/renter/:userId', (req, res, next) => {
        Reservation.findAll({
        include: [{model: Product}, {model: Review, as: 'renterReview'}],
        where: { renter_id: req.loggedInUser.id},
        order: 'date DESC'
    })
    .then(reviewedReservations=> {
        res.send(reviewedReservations);
        });
});

/* find all pending seller reviews */
router.get('/renter/:userId/pending', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product}, {model: Review, as:'sellerReview'}],
        where: {renter_id: req.loggedInUser.id},
        order: 'date DESC'
    })
    .then(pendingRenterReviews => {
        res.send(pendingRenterReviews);
    });
})


/* get all as seller ratings */
router.get('/seller/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product, where: {seller_id: req.loggedInUser.id}}
        , {model: Review, as: 'sellerReview'}],
        order: 'date DESC'
    })
    .then(reviewedReservations=> {
        res.send(reviewedReservations);
    })
})


/* find all as seller pending reviews */
router.get('/seller/:userId/pending', (req, res, next) => {
     Reservation.findAll({
        include: [{model: Product, where: {seller_id: req.loggedInUser.id}}
        , {model: Review, as: 'renterReview'}],
        order: 'date DESC'
    })
    .then(pendingSellerReviews => {
        res.send(pendingSellerReviews);
    });
})



module.exports = router;

