import express from 'express'
import { createResume, getResumeById, getResumes } from '../controllers/ResumeController.js'
import ProtectRoute from '../middleware/ProtectRoute.js';

const router=express.Router()
router.post('/create' ,ProtectRoute,createResume);
router.get('/getResumes',ProtectRoute,getResumes)
router.post('/getResume',ProtectRoute,getResumeById)
export default router;