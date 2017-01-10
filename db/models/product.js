'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Product = db.define('products', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  end_date: Sequelize.DATEONLY
  });

module.exports = Product;
