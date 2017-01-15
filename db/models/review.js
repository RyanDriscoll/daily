'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      hasMinimumLength: function(value) {
        if(value.length<=10) {
          throw new Error('Review must be more than 10 letters');
        }
      }
    }
  }
});

module.exports = Review;
