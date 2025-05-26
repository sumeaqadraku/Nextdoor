const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Access denied. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = {
    authenticateToken
}