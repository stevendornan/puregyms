import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/userModel.js'

// @desc      Get all users
// @route     GET /api/admin/users
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({})
  res.json(users)
})

// @desc      Delete User
// @route     DELETE /api/admin/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

export { getUsers, getUserById, deleteUser }
