'use strict';

const db = require('APP/db');
const chalk = require('chalk');
const { User } = require('APP/db/models');
const router = require('express').Router();


router.param('userId', (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
    .then(user=> {
        if(!user) res.send(404);
        else {
            req.loggedInUser = user;
            next();
        }
    })
});

/* get user id */
router.get('/:userId', (req, res, next) => {
   res.send(req.loggedInUser);
});

/* update user information */
router.put('/', (req, res, next ) => {
    const {oldPassword} = req.body
    req.user.authenticate(oldPassword)
    .then(authenticated => {
        if(authenticated){
            let updateBody = {}
            for(var key in req.body){
                if(key==='firstName')
                    updateBody.firstName=req.body.firstName;
                else if(key==='lastName')
                    updateBody.lastName=req.body.lastName;
                else if(key==='newPassword')
                    updateBody.password = req.body.newPassword;
            }
            req.user.update(updateBody)
            .then(result => {
                res.send(result);
            })
        }
        else {
            res.send(401);
        }
    })
    .catch(next)
});


















module.exports = router;

