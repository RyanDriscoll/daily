'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const Product = require('APP/db/models/product')



const Reservation = db.define('reservations', {
    date: Sequelize.DATEONLY,
    order: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: Sequelize.ENUM('carted', 'canceled', 'completed')
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
      },
      pendingReservation: function() {
        return this.status === 'completed' && this.date > Date.now();
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
