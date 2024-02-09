import express from 'express'
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js'
import { createPost, getPosts } from '../controller/post.controller.js';

router.post('/create', verifyToken, createPost);
router.post('/get-posts', getPosts)

export default router;