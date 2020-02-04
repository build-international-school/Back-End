module.exports = (req, res, next) => {
    console.log('Req session', req.session, 'email', req.session.email )
    if(req.session.loggedIn && req.session.email) {
        next();
    } else {
        res.status(403).json( {message: 'Unauthorized access!' });
    };
  };