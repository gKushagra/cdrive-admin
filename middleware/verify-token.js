require('dotenv').config();
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.TKN_SECRET,
        (err, decoded) => {
            if (err)
                res.sendStatus(500)
                
            // console.log(decoded);
            next();
        });
}

module.exports = verifyToken;