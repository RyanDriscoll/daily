const express = require('express')
const router = express.Router()
const Product = require('APP/db/models/product')


router.get('/', (req,res, next)=>{
return  Product.findAll()
  .then(products=>{
    res.json(products)
  })
  .catch(next)
})


module.exports = router
