import path from 'path'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'

import Gym from '../models/gymModel.js'

// @desc    Get logged in users published gyms
// @route   GET /api/gyms/mygyms
// @access  Private
const getMyGyms = asyncHandler(async (req, res, next) => {
  const gyms = await Gym.find({ user: req.user._id })
  res.json(gyms)
})

// @desc    Fetch all gyms
// @route   GET /api/gyms
// @access  Public
const getGyms = asyncHandler(async (req, res, next) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : ''
  const count = await Gym.countDocuments({ ...keyword })
  const gyms = await Gym.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ gyms, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch gym by Id
// @route   GET /api/gyms/:id
// @access  Public
const getGymDetails = asyncHandler(async (req, res, next) => {
  const gym = await Gym.findById(req.params.id)

  if (!gym) {
    return next(
      new ErrorResponse(`Gym not found with id of ${req.params.id}`, 404)
    )
  }
  res.json(gym)
})

// @desc    Create a gym
// @route   POST /api/gyms
// @access  Private
const createGym = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id

  const publishedGym = await Gym.findOne({ user: req.user.id })

  if (publishedGym && req.user.role !== 'admin') {
    return next(new ErrorResponse(`You have already published a gym`, 400))
  }

  const gym = await Gym.create(req.body)

  res.json(gym)
})

// @desc    Update a gym
// @route   PUT /api/gyms/:id
// @access  Private
const updateGym = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    address,
    website,
    phone,
    email,
    image,
    disabledAccess,
    carPark,
  } = req.body

  const gym = await Gym.findById(req.params.id)

  if (gym.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this gym`,
        401
      )
    )
  }

  if (gym) {
    gym.name = name
    gym.description = description
    gym.address = address
    gym.phone = phone
    gym.email = email
    gym.website = website
    gym.image = image
    gym.disabledAccess = disabledAccess
    gym.carPark = carPark

    const updatedGym = await gym.save()
    res.json(updatedGym)
  } else {
    return next(
      new ErrorResponse(
        `Gym not found with slug name of ${req.params.slug}`,
        404
      )
    )
  }
})

// @desc    Delete a gym
// @route   DELETE /api/gyms/:id
// @access  Private
const deleteGym = asyncHandler(async (req, res, next) => {
  const gym = await Gym.findById(req.params.id)

  if (!gym) {
    return next(
      new ErrorResponse(`Gym not found with id of ${req.params.id}`, 404)
    )
  }

  if (gym.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this gym`,
        401
      )
    )
  }

  await gym.remove()
  res.status(200).json({})
})

// @desc      Get gym by name
// @route     GET /api/gyms/:name
// @access    Public
const getGymsByName = asyncHandler(async (req, res) => {
  const name = req.query.name || ''
  const gyms = await Gym.find({ name })

  res.json(gyms)
})

// @desc    Upload photo for gym
// @route   PUT /api/gyms/:id/photo
// @access  Private
const gymPhotoUpload = asyncHandler(async (req, res, next) => {
  const gym = await Gym.findById(req.params.id)

  if (!gym) {
    return next(
      new ErrorResponse(`Gym not found with id of ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400))
  }

  const file = req.files.file

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} file`,
        400
      )
    )
  }

  file.name = `photo_${gym._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse('Problem with file upload', 500))
    }
    await Gym.findByIdAndUpdate(req.params.id, { photo: file.name })
    res.status(200).json(file.name)
  })
})

export {
  getMyGyms,
  getGyms,
  getGymDetails,
  createGym,
  updateGym,
  deleteGym,
  getGymsByName,
  gymPhotoUpload,
}
