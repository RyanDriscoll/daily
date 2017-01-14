'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User } = require('APP/db/models');
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

/* get user id */
router.get('/:userId', (req, res, next) => {
   res.send(req.loggedInUser);
});

/* updating user information by userId */
router.put('/:userId', (req, res, next ) => {
    req.loggedInUser.authenticate('123')
    .then(authenticated => {
        if(authenticated){
            req.loggedInUser.update(req.body)
            .then(result => {
                res.send(result);
            })
        }
        else {
            res.send(401);
        }
    });
});


// /* get user renting transactions */
// router.get('/reservations/asRenter/:userId/', (req, res, next) => {
//     Reservation.findAll({
//         include: [{model: Product}],
//         where: {renter_id: req.params.userId},
//         order: 'date DESC'
//     })
//     .then(reservations => {
//         res.send(reservations);
//     });
// });


// /* get user selling transactions */
// router.get('/reservations/asSeller/:userId/', (req, res, next) => {
//     Reservation.findAll({
//         include: [{model: Product, where: { seller_id: req.params.userId}}],
//         order: 'date DESC'
//     })
//     .then(sellingTransactions => {
//         res.send(sellingTransactions);
//     });
// });



// /* get users rating as renter */
// /* find reservations renterId get its seller review */
// router.get('/ratings/asRenter/:userId', (req, res, next) => {
//     Reservation.findAll({
//         include: [{model: Product}, {model: SellerReview}],
//         where: { renter_id: req.params.userId},
//         order: 'date DESC'
//     })
//     .then(reservations=> {
//         //filter only if reservation is reviewed
//         const reviewedReservations = reservations.filter(reservation => reservation.seller_review);
//         res.send(reviewedReservations);
//     })
// });


// /* get users rating as seller */
// /* find product's sellerId and get renters review */
// router.get('/ratings/asSeller/:userId', (req, res, next) => {
//     Reservation.findAll({
//         include: [{model: Product, where: {seller_id: req.params.userId}}
//         , {model: RenterReview}],
//         order: 'date DESC'
//     })
//     .then(reservations=> {
//         const reviewedReserations = reservations.filter(reservation => reservation.renter_review );
//         res.send(reviewedReserations);
//     })
// });













module.exports = router;

