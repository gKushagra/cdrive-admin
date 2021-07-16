require('dotenv').config();
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.TKN_SECRET);
        req.user = decodedToken.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("unauthorized");
    }
};