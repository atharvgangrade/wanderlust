const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first!",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(err) {
        res.status(401).json({
            success: false,
            message: "Please login first!",
        });
    }
};

module.exports = { isLoggedIn };