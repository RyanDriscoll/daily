'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Reservation = require('./reservation')
const SellerReview = require('./sellerReview')
const RenterReview = require('./renterReview')

Product.belongsTo(User, {as: 'seller'});

Category.hasMany(Product);

Product.hasMany(Reservation);
Reservation.belongsTo(User);
SellerReview.belongsTo(Reservation);
RenterReview.belongsTo(Reservation);

module.exports = {User, Product, Category, Reservation, SellerReview, RenterReview}
