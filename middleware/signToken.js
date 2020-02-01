const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secret.js');

module.exports = function(user) {
    const payload = {
      id: user.id,
      name: user.username,
      type: user.type
    };
  
    const options = {
      expiresIn: '8h'
    }
  
    return jwt.sign(payload, jwtSecret, options);
  }