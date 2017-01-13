'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

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
      },
      pendingReservation: function() {
        return this.status === 'completed' && this.date > Date.now();
      }
    }
  });

module.exports = Reservation;
