'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Category = require('./category')
const Review = require('./review')
const Reservation = require('./reservation')

const Product = db.define('products', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  price: Sequelize.INTEGER,
  end_date: Sequelize.DATEONLY,
  img_url: Sequelize.STRING,
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }

},
  {
    classMethods: {
      getProductReviews: function(id){
      return  Product.findAll({where:
          {id:id},
          include: [{model: Review}]


        })
      }
    }
  });

module.exports = Product;
