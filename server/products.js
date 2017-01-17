const express = require('express')
const router = express.Router()
const Product = require('APP/db/models/product')
const Review = require('APP/db/models/review')
const Reservation = require('APP/db/models/reservation')


router.get('/', (req, res, next) => {
	return Product.findAll()
		.then(products => {
			res.json(products)
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	Product.create(req.body)
		.then(product => res.json(product))
		.catch(next)
})

router.get('/:productId', (req, res, next) => {
	let productId = req.params.productId
	console.log("productID", productId)
	return Product.findById(productId)
		.then(product => {
			res.json(product)
		})
		.catch(next)
})

router.get('/:productId/reviews', (req, res, next) => {
	let productId = req.params.productId
	console.log("productID", productId)
	return Reservation.findAll({
		where:{
			product_id: productId},
			include: [{model: Review, as: "sellerReview"}]
		})
		.then(reservation => {
			console.log("PRODUCTS WITH RESERVATION", reservation)
			res.json(reservation)
		})
		.catch(next)
})


module.exports = router
