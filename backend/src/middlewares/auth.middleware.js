const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    if (req.path.startsWith("/auth")) return next();

    const auth = req.headers.authorization;

    const token = auth?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Нэвтрэнэ үү!" });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Нэвтрэнэ үү!" });
    }
};

module.exports = { authMiddleware };