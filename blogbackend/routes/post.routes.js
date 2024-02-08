import express from 'express'
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js'
import { createPost } from '../controller/post.controller.js';

router.post('/create', verifyToken, createPost)

export default router;