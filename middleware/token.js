const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ errorMessage: err })
        } else {
          req.user = { type: decodedToken.type };
          next();
        }
      })
    } else {
      res.status(400).json( {error: 'Token missing!'})
    }
  }