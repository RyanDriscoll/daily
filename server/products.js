const express = require('express')
const router = express.Router()
const Product = require('APP/db/models/product')


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
		.then(products => {
			res.json(products)
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


module.exports = router

