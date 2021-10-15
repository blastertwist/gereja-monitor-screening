const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const tokenVerifier = async (req, res, next) => {
    try {
        if (req.headers["x-auth-header"]) {
            var decoded = jwt.verify(req.headers["x-auth-header"].split("barrier")[1], process.env.JWT_SECRET_KEY);
            res.locals.id = decoded.id;
            next();
        } else {
            throw Error("NO_TOKEN");
        }
    } catch (err) {
        res.status(401).send({
            'code': 'TOKEN_VERIFY_ERROR',
            'msg': 'Failed to verify token, something error...',
            'err': err
        })
    }
}

module.exports = tokenVerifier;