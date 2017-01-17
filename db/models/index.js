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


Reservation.belongsTo(User, {as: 'renter'});
Reservation.belongsTo(User, {as: 'seller'});


Reservation.belongsTo(Product);


Reservation.belongsTo(Review, { as: 'sellerReview'})
Reservation.belongsTo(Review, { as: 'renterReview'})

Product.hasMany(Review)


module.exports = {User, Product, Category, Reservation, Review}
