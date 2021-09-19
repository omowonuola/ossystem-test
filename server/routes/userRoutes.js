import express from 'express'
const router = express.Router()
import { 
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
	deleteUsers,
	updateUser,
    getUsers,
	getUserById,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/login').post(authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers);
router
    .route('/profile')
    .get( protect, getUserProfile)
    .put(protect, updateUserProfile)


router
    .route('/:id')
    .delete(protect, admin, deleteUsers)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)


    
export default router