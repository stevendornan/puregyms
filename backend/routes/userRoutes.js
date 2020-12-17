import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/register', registerUser)
router.route('/:id').delete(protect, deleteUserAccount)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
