const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token missing',
            status: 'ERROR'
        });
    }

    jwt.verify(token, 'access_token', (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid authentication token',
                status: 'ERROR'
            });
        }

        const { payload } = user;
        // console.log(payload);
        if (payload?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: 'User is not an admin',
                status: 'ERROR'
            });
        }
    });


}

module.exports = {
    authMiddleware
}