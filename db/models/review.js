'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = db.define('review', {
  stars: Sequelize.INTEGER,
  text: Sequelize.TEXT
  });

module.exports = Review;
