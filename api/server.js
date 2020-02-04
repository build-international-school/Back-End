const express = require('express');
const configMiddleware = require('../middleware/config.js');

const verifyToken = require('../middleware/token.js')
const verifySession = require('../middleware/session.js');
const authRouter = require('../auth/auth-router.js');
const adminsRouter = require('../admins/admins-router.js');
const workersRouter = require('../workers/workers-router.js');
const studentsRouter = require('../students/students-router.js');


const server = express();

configMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/admins', verifyToken, adminsRouter);
server.use('/api/workers', verifyToken, workersRouter);
server.use('/api/students', verifyToken, studentsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Server is online!</h2><br><div>Visit: <a href='https://github.com/build-international-school/Back-End'>https://github.com/build-international-school/Back-End</a> for more API info.</div>`)
  });

module.exports = server;
