'use strict'

const db = require('APP/db');
const Category = db.model('categories');
const router = require('express').Router();



router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => {
    res.json(categories)
  })
  .catch(next)
});

module.exports = router;