import jwt from 'jsonwebtoken';

/**
 * Check middleware of user before calling api.
 * 
 * @param {*} req - Express Request object.
 * @param {*} res - Express Response object.
 * @param {*} next - Continue if it hasn't error.
 * @returns - Error if any.
 */
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization
        console.log(req.headers);

        if (!token) {
            return res.status(401).json({ error: 'token header missing' });
        }

        const accessToken = token.split(' ')[1];

        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (error, user) => {
            if (error) {
                return res.status(403).json({
                    error: "The user is not authentication!"
                })
            }
            next();
        })
    } catch (error) {
        return res.status(403).json({ error: "The user is not authentication!" })
    }
}

export default authMiddleware;