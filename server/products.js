const express = require('express')
const router = express.Router()
const Product = require('APP/db/models/product')
const Review = require('APP/db/models/review')
const Reservation = require('APP/db/models/reservation')
const User = require('APP/db/models/user')


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
	return Product.findById(productId)
		.then(product => {
			res.json(product)
		})
		.catch(next)
})


/*get all products of user */
router.get('/users/:userId', (req, res, next) => {
	Product.findAll({
		where: {seller_id: req.params.userId}
	})
	.then(products => {
		res.json(products);
	})
	.catch(next);
})

/* delete a product */
router.delete('/:productId', (req, res, next) => {
	Product.update({
		active: false},
		{where: { id: req.params.productId}
	})
	.then(product => {
		res.json(product);
	})
	.catch(next);
});


router.get('/:productId/reviews', (req, res, next) => {
	let productId = req.params.productId
	return Reservation.findAll({
		where:{
			product_id: productId},
			include: [{model: Review, as: "renterReview"}, {model: User, as: 'seller'}, {model: User, as: 'renter'}]
		})
		.then(reservation => {
			res.json(reservation)
		})
		.catch(next)
})



module.exports = router
