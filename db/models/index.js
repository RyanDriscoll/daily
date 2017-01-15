'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Reservation = require('./reservation')
const Review = require('./review')

Product.belongsTo(User, {as: 'seller'});

// Category.hasMany(Product);
Product.belongsTo(Category);

//I got rid of this
// Product.hasMany(Reservation);

Reservation.belongsTo(User, {as: 'renter'});
User.hasMany(Reservation, {as: 'renterReservations'})

//this is new
Reservation.belongsTo(Product);

Reservation.belongsTo(Review, { as: 'sellerReview'})
Reservation.belongsTo(Review, { as: 'renterReview'})

// User.belongsToMany(Review, { through: Reservation, as: 'sellerReviews', foreignKey: 'seller_review_id' })
// User.belongsToMany(Review, { through: Reservation, as: 'renterReviews', foreignKey: 'renter_review_id' })

module.exports = {User, Product, Category, Reservation, Review}
