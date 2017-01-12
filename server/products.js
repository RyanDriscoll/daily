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



router.get('/:productId',(req,res, next)=>{
  let productId = req.params.productId
  console.log("PRODUCT ID",productId)
return  Product.findById(productId)
  .then(products=>{
    res.json(products)
  })
  .catch(next)
})




module.exports = router
