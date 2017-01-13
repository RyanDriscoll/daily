'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Product = require('APP/db/models/product')
const SellerReview = require('APP/db/models/sellerReview')


const Reservation = db.define('reservations', {
    date: Sequelize.DATEONLY,
    order: Sequelize.INTEGER,
    status: Sequelize.ENUM('carted', 'cancelled', 'completed')
  }, {
    hooks: {
      beforeBulkCreate: function(){
        Reservation.max('order')
        .then(orderNum=>{
          this.update({
            order:orderNum
          })
        })
      }
    },
    getterMethods: {
      fulfilled: function() {
        return this.status === 'completed' && this.date < Date.now();
      }
    },
    classMethods:{
      getSellerAndProduct: function(reservationId){
        console.log("IN CLASS METH RESERV")
        return Reservation.findAll({
          where:{
            id: reservationId
          },
          include: [{model:Product}, {model: SellerReview}]
        }).then(reservation=>{

          return reservation
        })
        .catch(err=>console.log(err))
      }
    }
  });

module.exports = Reservation;
