import express from 'express'
const router = express.Router()
import {authUser,getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/:id').delete(protect,admin,deleteUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router