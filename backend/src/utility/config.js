require('dotenv/config')

module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.PORT = process.env.PORT;

module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports.DB_USERNAME = process.env.DB_USERNAME
module.exports.DB_PASSWORD = process.env.DB_PASSWORD
module.exports.DB_NAME = process.env.DB_NAME
module.exports.DB_HOST = process.env.DB_HOST
