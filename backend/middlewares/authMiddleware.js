const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded.id
            next()
        }
        catch (err) {
            res.status(401).send({ message: "Invalid token" });
        }
    }
    else if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}

module.exports = authenticate