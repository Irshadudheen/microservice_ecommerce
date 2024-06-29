import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async (req, res, next) => {
    

    if (req.cookies) {
     const   token = req.cookies.user;
   

        if (token) {
            try {
         
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                
                req.clientId = decoded.userId
                
                next();
            } catch (error) {
                console.error(error);  // Log the error for debugging
                res.status(401).send('Invalid token');
            }
        } else {
            res.status(401).send('Not authorized , no token');
        }

    } else {
        res.status(401).send('Not authorized, no token');
    }
});
export { protect };
