import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return next(new ErrorResponse('Not authorised to access this route', 401))
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      return next(new ErrorResponse('Not authorized to access this route', 401))
    }
  }
})

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}

export { protect, authorize }
