import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

/*
 * - user register controller
 * - POST /api/auth/register
 */
export const userRegister = async (req, res, next) => {
  const { email, name, password } = req.body;
  const isExists = await userModel.findOne({ email: email });
  if (isExists) {
    const error = new Error('User already exists');
    error.statusCode = 422;
    return next(error);
  }
  const user = await userModel.create({
    email,
    name,
    password,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
  res.cookie('Token', token);
  return res.status(201).json({
    user: { _id: user._id, Name: user.name, Email: user.email },
    token,
  });
};

/*
 * - user login controller
 * - POST /api/auth/login
 */
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    const error = new Error('User not found ! Please SignUp');
    error.statusCode = 404;
    return next(error);
  }
  const isMatchPassword = await user.comparePassword(password);
  if (!isMatchPassword) {
    const error = new Error('Password do not match');
    error.statusCode = 401;
    return next(error);
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
  res.cookie('Token', token);
  return res.status(200).json({
    user: { _id: user._id, Name: user.name, Email: user.email },
    token,
  });
};
