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

/* get all reservations as renter */
router.get('/renter/:userId', (req, res, next) => {
   Reservation.findAll({
       include: [{model: Product}],
       where: {renter_id: req.loggedInUser.id},
       order: 'date DESC'
   })
   .then(reservations => {
       res.send(reservations);
   })
});

/* get all reservations as seller */
router.get('/seller/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product, where: { seller_id: req.params.userId}}],
        order: 'date DESC'
    })
    .then(reservations => {
        res.send(reservations);
    })
})

function updateReservationStatusAndOrderNumber(reservations) {
  let orderNum = Reservation.getLargestOrderNumber();
    reservations.forEach( reservation =>
               Reservation.findOne({where: {id: reservation.id}})
                   .then(singleReservation => {
                       singleReservation.status='completed';
                       singleReservation.order=orderNum++;
                   })
           )

}

//update the reservation status to completed
router.put('/', (req, res, next) =>{
    console.log('got into reservations router.put, here is req.body', req.body)
    updateReservationStatusAndOrderNumber(req.body);
})


module.exports = router;

