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
        res.json({message: 'sign up successful!', newUser})
    }
        
     catch (err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'invalid credentials'))  // return next ...?
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
            {id:validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'});

            const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie('token,access_token',  {
                httpOnly: true}).json(rest);

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body;

    try {
        const user = await User.findOne({email});
        if (user) {
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('acccess_token', token, {
                httpOnly:true
            }).json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                password: hashedPassword,
                email,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.jwt.JWT_SECRET);
            const {password, ...rest} = newUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly: true,

            }).json(rest);
        }
    } catch (error) {
        
    }
}
