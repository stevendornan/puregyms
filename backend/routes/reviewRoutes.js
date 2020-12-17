import express from 'express'
const router = express.Router()
import { authorize, protect } from '../middleware/authMiddleware.js'

import { createReview, getReviews } from '../controllers/reviewController.js'

router.route('/gym/:gymId').get(getReviews)

router
  .route('/:gymId/reviews')
  .get(getReviews)
  .post(protect, authorize('user', 'admin'), createReview)

export default router
