import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

import {
  getMyGyms,
  getGyms,
  getGymDetails,
  createGym,
  updateGym,
  deleteGym,
  gymPhotoUpload,
} from '../controllers/gymController.js'

router.route('/:id/photo').put(gymPhotoUpload)
router.route('/myGyms').get(protect, getMyGyms)
router.route('/').get(getGyms).post(protect, createGym)

router
  .route('/:id')
  .get(getGymDetails)
  .put(protect, updateGym)
  .delete(protect, deleteGym)

export default router
