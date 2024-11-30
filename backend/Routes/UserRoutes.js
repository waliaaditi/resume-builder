import express from 'express'
import ProtectRoute from '../middleware/ProtectRoute.js'
import { getUserByEmail, loginUser, logout, signupUser, updateUser } from '../controllers/UserController.js';
const router=express.Router();
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',logout)
router.get('/getUser',ProtectRoute,getUserByEmail);
router.post('/updateUser',ProtectRoute,updateUser)
export default router;