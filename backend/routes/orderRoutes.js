import express from 'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'
import {addOrderItems} from '../controllers/orderContoller.js'

router.route('/').post(protect,addOrderItems)

export default router