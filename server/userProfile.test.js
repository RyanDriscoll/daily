const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

describe('/api/userProfile', () => {

  describe('get user profile info', () => {
    it('GET user id 1', () =>
      request(app)
        .get(`/api/userProfile/id/1`)
        .expect(200)
    )

    it('GET all user as renter reservations', () =>
      request(app)
        .get('/api/userProfile/reservations/asRenter/2')
        .expect(200)
    )

    it('get all user as ', () =>
      request(app)
        .get('/api/userProfile/ratings/asRenter/2')
        .expect(200)
    )
  })
})