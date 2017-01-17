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

// get all reservations for a product
router.get('/:productId', (req, res, next) => {
    Reservation.findAll({where: {id: req.params.productId}})
    .then(reservations => res.send(reservations))
    .catch(next);
})


//update the reservation order number (to next available number) and status (to completed)
router.put('/', (req, res, next) =>{
    Reservation.getLargestOrderNumber()
        .then((order)=> {
            order++
            req.body.forEach( reservation =>
                Reservation.findOne({where: {id: reservation.id}})
                    .then(singleReservation => {
                        singleReservation.update({status: 'completed'})
                        singleReservation.update({order: order})
                    })
            )
        })
        .then(res.sendStatus(200))
        .catch(next)

})


// post a reservation
router.post('/', (req, res, next) => {
    Reservation.create(req.body.reservation)
    .then(newReservation => {
        return newReservation.setProduct(req.body.product.id)
        .then(res1 => res1.setRenter(req.body.user.id))
        .then(res2 => {
            return Promise.all([Product.findById(req.body.product.id), res2])
            .then(([prod, res3]) => res3.setSeller(prod.seller_id))
            .then((updatedReservation) => {
                res.send(updatedReservation)
            })
            .catch(next);
        })
    })
})

module.exports = router;

