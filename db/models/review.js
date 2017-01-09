'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = db.define('reviews', {
  stars: Sequelize.RANGE,

  });

module.exports = Review;