'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User , Reservation , Review , Product } = require('APP/db/models');

const router = require('express').Router();
const stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");



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

router.post('/save-stripe-token', (req, res, next) => {

// Get the payment token submitted by the form:
    const token = req.body.body["id"];

// Charge the user's card:
    const charge = stripe.charges.create({
        amount: 1000,
        currency: "usd",
        description: "Example charge",
        source: token,
    }, function(err, charge) {
        if(err){
            res.send(err);
        }
        else{
            res.send(charge);
        }
    });




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

