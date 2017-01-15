const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

describe('/api/userProfile', () => {

  let user1;

  beforeEach(function () {
    return User
      .create({firstName: "alv", lastName: "yuen", password: "123", isAdmin: false, email: "alvin@alvin.com"})
      .then((user) => {
        user1 = user;
      })

  });

  describe('get user profile', () => {
    it('GET user info', () => {
      request(app)
        .get(`/api/userProfile/${user1.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.email)
            .to
            .equal(user1.email);
        })
    });
  });

  describe('update user profile', () => {
    it('UPDATE user info', () => {
      let userUpdate = {
        password: "123",
        email: "yuen@yuen.com"
      }
      request(app)
        .put(`/api/userProfile/${user1.id}`)
        .send(userUpdate)
        .expect(200)
        .then((res) => {
          expect(res.body.email)
            .to
            .equal(userUpdate.email);
        })

    })
  });

})