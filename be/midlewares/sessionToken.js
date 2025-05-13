import { log } from 'console';
import jwt from 'jsonwebtoken';

const verifySessionToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SHOPIFY_API_SECRET);
        req.shopifySession = decoded; 

        req.storeUrl = decoded.dest.replace('https://','')
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export default verifySessionToken;