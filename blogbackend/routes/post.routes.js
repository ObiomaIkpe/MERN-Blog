import express from 'express'
const router = express.Router();
import {verifyToken} from '../utils/verifyUser.js'
import { createPost, deletePosts, getPosts, updatePost } from '../controller/post.controller.js';

router.post('/create', verifyToken, createPost);
router.post('/get-posts', getPosts);
router.delete('deletepost/:postId/:userId', verifyToken, deletePosts)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)

export default router;