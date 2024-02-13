import express from "express";
import { createComment, getPostComments, likeComment, editComment } from "../controller/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.post('/createcomment', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', likeComment);
router.put('/editComment/:commentId', editComment);

export default router