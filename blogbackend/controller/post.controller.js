import Post from "../models/posts.model.js"
import { errorHandler } from "../utils/handleError.js"


export const createPost = async (req, res, next) => {
        console.log(req.body)
        if(!req.user.isAdmin){
            return next(errorHandler(403, 'you are not allowed!'))
        }

        if(!req.body.title || !req.body.content) {
            return next(errorHandler(400, 'Please provide all required fields'))
        }

        const slug = req.body.title.toLowerCase().split('').join('-').replace(/[^a-zA-Z0-9]/g, '-')
        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user.userId
        })


        try {
            const savedPost = await newPost.save();
            res.status(201).json({
                savedPost
            })
        } catch (error) {
            next(error)
        }
}