import express  from "express";
import connectDB from './connect/connectDB.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes.js'

import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments/', commentRoutes);

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    console.log(err)
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})


const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI)
        app.listen(3000, () => {
            console.log('hell from the server side!')
            });
    } catch (err) {
        console.log(err)
    }
}

start();