const User = require('./repository');
const jwt = require('jsonwebtoken');
const moment = require('moment')

exports.isAuthenticated = async (req, res, next) => {
    try {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1];
            if (token == undefined || token == 'undefined'){
                return res.status(403).json({succes: false, message: 'Not Authorized'});
            }

            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodeToken;
            next()
        } else {
            return res.status(403).json({succes: false, message: 'Not Authorized'});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({succes: false, message: 'Bad request'});
    }
  }