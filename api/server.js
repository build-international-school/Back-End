const express = require('express');
const configMiddleware = require('../middleware/config.js');

const verifyToken = require('../middleware/token.js')
const verifySession = require('../middleware/session.js');
const authRouter = require('../auth/auth-router.js');
const adminsRouter = require('../admins/admins-router.js');


const server = express();

configMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/admins', verifyToken, verifySession, adminsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running." });
  });

module.exports = server;
