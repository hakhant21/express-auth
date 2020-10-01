const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Error Handler
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: "", password: ""}

  // incorrect email
  if(err.message === 'incorrect email'){
    errors.email = 'Email is not registered'
  }
  // incorrect password
  if(err.message === 'incorrect password'){
    errors.password = 'Password is incorrect'
  }

  // duplicate error
  if(err.code === 11000){
    errors.email = 'that email is already existed';
    return errors;
  }

  // validation error
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

// Token JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'hakhant secret', {
    expiresIn: maxAge
  })
}


module.exports.signup_post = async (req, res) => {
  const { email , password } = req.body;
  try{
    const user = await User.create({ email,password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user:  user._id });
  }catch(err){
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}
