const express = require('express')
const router = express.Router()
const Reservation = require('APP/db/models/reservation')

router.get('/', (req, res, next) => {
	return Reservation.findAll()
		.then(reservations => {
			res.json(reservations)
		})
		.catch(next)
})


router.get('/:reservationId', (req, res, next)=>{
  let reservationId = req.params.reservationId
  console.log("RESERVE ID", reservationId)
  Reservation.getSellerAndProduct(reservationId)
  .then(reservation => {
    console.log("RESEVER", reservation)
    res.json(reservation)})
})


module.exports = router
