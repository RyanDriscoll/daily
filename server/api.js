'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/users', require('./users'))
  .use('/auth', require('./auth'))
  .use('/categories', require('./categories'))
  .use('/products', require('./products'))
  .use('/userProfile', require('./userProfile'))

  .use('/reservations', require('./reservations'))
  .use('/ratings', require('./ratings'))



// Send along any errors
api.use((err, req, res, next) => {
  console.error("error:", err.stack);
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
