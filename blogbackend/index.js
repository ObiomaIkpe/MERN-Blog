import express  from "express";
import connectDB from './connect/connectDB.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import commentRoutes from './routes/comment.routes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes.js';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();
const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/blogfrontend/dist')));

 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'blogfrontend', 'dist', 'index.html'))
 })

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

app.get('/', (req, res) => {
    res.send('1')
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