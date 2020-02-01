const router = require('express').Router();

const Admins = require('./admins-model.js');

router.get('/', (req, res) => {
  Admins.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;