'use strict';

const db = require('APP/db');
const { User , Reservation , Review, Product } = require('APP/db/models');

const router = require('express').Router();


/* get user information by userId */
router.get('/id/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then((user) => {
            res.send(user);
        });
});

/* updating user information by userId */
router.post('/update', (req, res, next ) => {
    console.log('updating user information', req.body);
    res.send();
});


/* get user renting transactions */
router.get('/reservations/asRenter/:userId/', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product}],
        where: {renter_id: req.params.userId},
        order: 'date DESC'
    })
    .then(reservations => {
        res.send(reservations);
    });
});


/* get user selling transactions */
router.get('/reservations/asSeller/:userId/', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product, where: { seller_id: req.params.userId}}],
        order: 'date DESC'
    })
    .then(sellingTransactions => {
        res.send(sellingTransactions);
    });
});



/* get users rating as renter */
/* find reservations renterId get its seller review */
router.get('/ratings/asRenter/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product}, {model: SellerReview}],
        where: { renter_id: req.params.userId},
        order: 'date DESC'
    })
    .then(reservations=> {
        //filter only if reservation is reviewed
        const reviewedReservations = reservations.filter(reservation => reservation.seller_review);
        res.send(reviewedReservations);
    })
});


/* get users rating as seller */
/* find product's sellerId and get renters review */
router.get('/ratings/asSeller/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product, where: {seller_id: req.params.userId}}
        , {model: RenterReview}],
        order: 'date DESC'
    })
    .then(reservations=> {
        const reviewedReserations = reservations.filter(reservation => reservation.renter_review );
        res.send(reviewedReserations);
    })
});













module.exports = router;

