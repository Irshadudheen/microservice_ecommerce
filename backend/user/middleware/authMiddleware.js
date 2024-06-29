import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies) {
        token = req.cookies.jwt;

        if (token) {
            try {
         
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                
                req.user = await User.findById(decoded.userId).select('-password');
                
                next();
            } catch (error) {
                console.error(error);  // Log the error for debugging
                res.status(401).send('Invalid token');
            }
        } else {
            res.status(401).send('Not authorized, no token');
        }

    } else {
        res.status(401).send('Not authorized, no token');
    }
});
export { protect };
