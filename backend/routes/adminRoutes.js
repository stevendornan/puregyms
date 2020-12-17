import express from 'express'
const router = express.Router()
import { protect, authorize } from '../middleware/authMiddleware.js'

import {
  getUsers,
  getUserById,
  deleteUser,
} from '../controllers/adminController.js'

router.route('/users').get(protect, authorize('admin'), getUsers)
router
  .route('/users/:id')
  .get(protect, authorize('admin'), getUserById)
  .delete(protect, authorize('admin'), deleteUser)

export default router
