const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Admins = require('../admins/admins-model.js');
const Workers = require('../workers/workers-model.js');
const verifySession = require('../middleware/session.js')
const signToken = require('../middleware/signToken.js')

router.get('/', (req, res) =>{
  res.send("Auth route success");
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  if (user.type === 'admin'){
    Admins.add(user)
      .then(saved => {
        const token = signToken(saved);
        req.session.loggedIn = true;
        req.session.email = user.email;
        const payload = {...saved, token: token}
        res.status(201).json(payload);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
    });
  } else if (user.type === 'worker'){
    Workers.add(user)
      .then(saved => {
        const token = signToken(saved);
        req.session.loggedIn = true;
        req.session.email = user.email;
        const payload = {...saved, token: token}
        res.status(201).json(payload);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
    });
  } else {
    return res.status(400).json({ message: 'Invalid user type!' })
  }


});

router.post('/login', (req, res) => {
  let { email, password } = req.body;
  Admins.findBy({email})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        req.session.loggedIn = true;
        req.session.email = user.email;
        console.log('Admin login email:', user.email)
        const payload = {...user, token: token}
        res.status(201).json(payload);
      } else {        
        // If email not found in admins, search workers:
        Workers.findBy({email})
          .first()
          .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
              const token = signToken(user);
              req.session.loggedIn = true;
              req.session.email = user.email;
              console.log('Worker login email:', user.email)
              const payload = {...user, token: token}
              res.status(201).json(payload);
            } else {        
              res.status(401).json({ message: 'Invalid email or password' });
            }
          })
          .catch(error => {
            console.log(error)
            res.status(500).json(error);
        });
        // res.status(404).json({ message: 'Unable to find email' });
      }
    })
    .catch(error => {
      console.log(error)
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