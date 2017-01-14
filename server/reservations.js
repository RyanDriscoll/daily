'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User , Reservation , Review , Product } = require('APP/db/models');

const router = require('express').Router();

/* get all past reservations */

router.get('/', (req, res, next) => {

   res.json('reservations');
});










module.exports = router;

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