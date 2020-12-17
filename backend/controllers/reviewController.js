import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'
import Gym from '../models/gymModel.js'
import Review from '../models/reviewModel.js'

// @desc    Get reviews
// @route   GET /api/reviews
// @route   GET /api/gyms/:gymId/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ gym: req.params.gymId }).populate(
    'user',
    'name'
  )

  return res.status(200).json(reviews)
})

// @desc    Create new review
// @route   POST /api/gyms/:gymId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id
  req.body.gym = req.params.gymId

  const gym = await Gym.findById(req.params.gymId)

  if (!gym) {
    return next(
      new ErrorResponse(`No gym with the id of ${req.params.gymId}`, 404)
    )
  }
  const reviews = await Review.find({})
  const alreadyReviewed = reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  )

  if (alreadyReviewed) {
    return next(new ErrorResponse('You have already reviewed this gym!'))
  }

  const createdReview = await Review.create(req.body)
  res.json(createdReview)
})

export { createReview, getReviews }
