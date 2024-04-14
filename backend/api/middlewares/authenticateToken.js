const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies?.["user-creds"];
    if(token == null) return res.status(401).json({ message: 'User is unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodeToken) => {
        if(err) return res.status(403).json({ message: 'Session is Expired! Please login again.' });

        if(req?.url === "/check-admin") {
            req.userRole = decodeToken?.role;
        }
        req.userEmail = decodeToken?.email;
        next();
    })
};

module.exports = authenticateToken;