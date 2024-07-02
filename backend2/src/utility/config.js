require('dotenv/config')

module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.PORT = process.env.PORT;

module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
