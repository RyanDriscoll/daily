'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const RenterReview = db.define('renter_reviews', {
  stars: Sequelize.INTEGER,
  text: Sequelize.TEXT
  });

module.exports = RenterReview;
