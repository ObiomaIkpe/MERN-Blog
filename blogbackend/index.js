import express  from "express";
import connectDB from './connect/connectDB.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json())

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


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