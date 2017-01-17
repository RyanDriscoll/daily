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



router.post('/', (req, res, next) => {
  Category.findOrCreate({
      name: req.body.name,
      where: { name: req.body.name}
  })
  .then(category => {
     res.send(category);
  })
  .catch(next)
});


router.delete('/:categoryId', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.categoryId
    }
  })
  .then(category => {
    if(category){
      res.sendStatus(200);
    }
    else{
    res.sendStatus(404);
    }
  });

});



module.exports = router;