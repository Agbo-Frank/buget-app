const { JWT_SECRET_KEY } = require("./config.js")
const { sign, verify } = require("jsonwebtoken")
const { UnauthorizedException } = require("./service-error.js")

class JWT {

  create(payload, options = {}){
    return sign(payload, String(JWT_SECRET_KEY),  {
      expiresIn: '360h',
      audience: 'API',
      issuer: 'Budget',
      ...options
    })
  }

  verifyToken(token){
    try {
      return verify(token, JWT_SECRET_KEY)
    } catch (error) {
      throw new UnauthorizedException(error?.message?.replace("jwt", "token") || "Session expired")
    }
  }
}

module.exports = new JWT()