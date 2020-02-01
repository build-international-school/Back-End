const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Admins = require('../admins/admins-model.js');
const verifySession = require('../middleware/session.js')
const signToken = require('../middleware/signToken.js')

router.get('/', (req, res) =>{
  res.send("Auth route success");
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Admins.add(user)
    .then(saved => {
      const token = signToken(saved);
      req.session.loggedIn = true;
      req.session.username = user.username;
      const payload = {...saved, token: token}
      res.status(201).json(payload);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Admins.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = signToken(user);
        req.session.loggedIn = true;
        req.session.username = user.username;
        const payload = {...user, token: token}
        res.status(201).json(payload);
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', verifySession, (req, res, next) => {
  req.session.destroy((err) => {
      if (err) {
          next(err)
      } else {
          res.json( { message: 'User successfully logged out'} )
      }
  })
})

module.exports = router;