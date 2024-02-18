import express from "express";
import { createComment, getPostComments, likeComment, editComment } from "../controller/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.post('/createcomment', verifyToken, createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likecomment/:commentId', likeComment);
router.put('/editcomment/:commentId', editComment);

export default router