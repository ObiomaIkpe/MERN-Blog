import express from 'express';
import {deleteUser, getAllUsers, getUser, signOut, test, updateUser} from '../controller/user.controller.js'
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOut)
router.get('/getusers', verifyToken, getAllUsers);
router.get('/:userId', getUser) 




export default router;