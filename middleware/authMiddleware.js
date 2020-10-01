const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check token exists & is verified
  if(token){
    jwt.verify(token, 'hakhant secret', (err, decodedToken)=> {
      if(err){
        console.log(err.message);
        res.status(401).json()('Cannot Verify User..Please provide valid information');
      }else{
        next();
      }
    })
  }else {
    res.status(401).json('Unauthorized..Please Login into your account');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // check token exists & is verified
  if(token){
    jwt.verify(token, 'hakhant secret', async(err, decodedToken)=> {
      if(err){
        console.log(err.message);
        res.locals.user = null;
        next();
      }else{
        let user = await User.findById(decodedToken.id);
        res.locals.user = user
        next();
      }
    })
  }else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };
