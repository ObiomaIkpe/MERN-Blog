import express  from "express";
import connectDB from './connect/connectDB.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();




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