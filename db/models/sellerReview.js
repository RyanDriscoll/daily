'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const SellerReview = db.define('seller_reviews', {
  stars: Sequelize.INTEGER,
  text: Sequelize.TEXT,
  });

module.exports = SellerReview;
