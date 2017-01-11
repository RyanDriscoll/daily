'use strict';

const db = require('APP/db');
const { User , Reservation , SellerReview, RenterReview, Product } = require('APP/db/models');

const router = require('express').Router();

// Product.belongsTo(User, {as: 'seller'});
// Product.belongsTo(Category);
// Category.hasMany(Product);
// Product.hasMany(Reservation);
// Reservation.belongsTo(User);
// SellerReview.belongsTo(Reservation);
// RenterReview.belongsTo(Reservation);

/* get user information by userId */
router.get('/id/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then((user) => {
            res.send(user);
        });
});


/* get user renting transactions */
//
router.get('/reservations/asRenter/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product}],
        where: {user_id: req.params.userId, status: 'completed'},
        order: 'date DESC'
    })
    .then(results => {
        res.send(results);
    });
})


/* get user selling transactions */
router.get('/reservations/asSeller/:userId', (req, res, next) => {
    Reservation.findAll({
        include: [{model: Product, where: { seller_id: req.params.userId}}],
        where: { status: 'completed' },
        order: 'date DESC'
    })
    .then(result => {
        res.send(result);
    });
})


/* get users rating from sellers */
/* find user under products and get its seller review */
router.get('/ratings/asRenter/:userId', (req, res, next) => {
    Product.findAll({
        include: [{model: Reservation, where: { user_id: req.params.userId},
            include: [{model: SellerReview }]}]
    })
  .then(results => {
      const reviews = [];
      results.forEach(product => {
          product.reservations.forEach(reservation => {
              if(reservation.seller_review){
                  reviews.push(reservation.seller_review);
              }
          })
      });
     res.send(reviews);
  });
});


/* get users rating from buyers */
/* find user under products and get renters review */
router.get('/ratings/asSeller/:userId', (req, res, next) => {
   Product.findAll({
       where: {
           seller_id: req.params.userId
       },
       include: [{ model : Reservation,
           include: [{ model : RenterReview }] }]
   })
   .then(results => {
       const reviews = [];
       results.forEach(product => {
           product.reservations.forEach(reservation => {
               if(reservation.renter_review){
                   reviews.push(reservation.renter_review);
               }
           })
       })
      res.send(reviews);
   });
});










module.exports = router;

