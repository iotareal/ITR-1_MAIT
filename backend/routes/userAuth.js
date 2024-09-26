const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //Bearer token
    if (token == null) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, "bookHaven123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };