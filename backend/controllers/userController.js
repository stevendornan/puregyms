import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Gym from '../models/gymModel.js'

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

//@desc     Register a new user
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Email already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Delete user account and associated gym
// @route   DELETE /api/users/:id
// @access  Private

const deleteUserAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  await Gym.findOneAndRemove({ user: req.user.id })
  await user.remove()
  res.status(200).json({})
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
}
