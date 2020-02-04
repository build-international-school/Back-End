module.exports = (req, res, next) => {
    console.log('Req session', req.session.loggedIn)
    if(req.session.loggedIn) {
        next();
    } else {
        res.status(403).json( {message: 'Unauthorized access!' });
    };
  };