'use strict'

const db = require('APP/db');
const Category = db.model('categories');
const router = require('express').Router();

module.exports = router;

router.get('/categories', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next)
});