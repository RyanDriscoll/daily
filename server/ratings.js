'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User , Reservation , Review , Product } = require('APP/db/models');

const router = require('express').Router();

/* get all past reservations */

router.get('/', (req, res, next) => {

   res.json('ratings');
});










module.exports = router;


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
