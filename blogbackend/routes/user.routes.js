import express from 'express';
import {deleteUser, getAllUsers, signOut, test, updateUser} from '../controller/user.controller.js'
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.patch('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/sign-out', signOut)
router.get('/getusers', verifyToken, getAllUsers)



export default router;