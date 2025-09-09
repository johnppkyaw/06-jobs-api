const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');


const register = async(req, res) => {
  const user = await User.create({...req.body});//mongoose validates the fields.  password is hashed in models/User.js
  const token = user.createJWT(); //this method in models/User.js 
  res.status(StatusCodes.CREATED).json({ user: {name: user.getName()}, token })
}

const login = async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    throw new BadRequestError('Please provide an email and password.')
  }
  const user = await User.findOne({email});
  if(!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  //compare password
  const isPasswordCorrect = await user.comparePassword(password) //method in models/User.js
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT(); //this method in models/User.js 
  res.status(StatusCodes.OK).json({ user: {name: user.getName()}, token })
}

module.exports = {
  register, 
  login
}
