'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Reservation = require('./reservation')

// User.hasMany(Product);
Product.belongsTo(User, {as: 'seller'});

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Reservation);
Reservation.belongsTo(User);
// Reservation.belongsToMany(Product, {through: 'product_reservation'});




module.exports = {User, Product, Category, Reservation}
