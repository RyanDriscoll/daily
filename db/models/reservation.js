'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Product = require('APP/db/models/product')
const Review = require('APP/db/models/review')




const Reservation = db.define('reservations', {
    date: Sequelize.DATE,
    order: {
      type: Sequelize.INTEGER
    },
    status: Sequelize.ENUM('carted', 'canceled', 'completed')
  }, {
    hooks: {
      beforeBulkCreate: function(){
        Reservation.max('order')
        .then(orderNum=>{
          this.update({where: {
            order:orderNum
          }})
        })
      }
    },
    getterMethods: {
      fulfilled: function() {
        return this.status === 'completed' && this.date < Date.now();
      },
      pendingReservation: function() {
        return this.status === 'completed' && this.date > Date.now();
      }
    },



    classMethods: {
      getLargestOrderNumber: function(){
        return Reservation.max('order')

      },

      getSellerAndProduct: function(reservationId){
        console.log("IN CLASS METH RESERV")
        return Reservation.findAll({
          where:{
            id: reservationId
          },
          include: [{model: Review, as: "sellerReview"}, {model: Product}]
        })

        }
      }
    });

module.exports = Reservation;
