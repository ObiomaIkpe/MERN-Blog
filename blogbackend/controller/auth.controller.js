import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/handleError.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    //console.log(req.body)
    const {username, email, password} = req.body;


    if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'All fields are required!'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.json({message: 'sign up successful!'})
    }
        
     catch (err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'invalid credentials'))
    }


    try {
        const validUser = await User.findOne({email});
        if(!validUser) {
            return next(errorHandler(404, 'user not found!'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){
          return next(errorHandler(404, 'invalid credentials'))
        }

        const token = jwt.sign(
            {userId:validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

            const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly: true}).json(rest);
    } catch (error) {
        next(error)
    }
}
