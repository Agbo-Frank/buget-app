const { validateRequest, responsHandler, hashPassword } = require("../../utility/helpers.js");
const { User } = require("../../models/index.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestException, NotFoundException } = require("../../utility/service-error.js");
const { Op, where } = require("sequelize");
const bcrypt = require("bcrypt")
const jwt = require("../../utility/jwt.js")

class Controller {
  async register(req, res, next){
    try {
      validateRequest(req)
      const { email, password, username } = req.body

      let user = await User.findOne({where: { email } })
      if(user) throw new BadRequestException("User with either email/username already exist");
      
      const hashed_password = await hashPassword(password)
      user = await User.create({ email, username, password: hashed_password })

      return responsHandler(res, "Registration successful", StatusCodes.CREATED, user)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next){
    try {
      validateRequest(req)
      const { email, password } = req.body

      let user = await User.findOne({where: { email } })
      if(!user) throw new NotFoundException("User not found");
      if(user.status === 'pending') throw new BadRequestException("User's account hasn't been activated");

      let is_match = await bcrypt.compare(password, user.password)
      if(!is_match) throw new BadRequestException("Incorrect password");

      const data = jwt.create({ id: user?.id })

      return responsHandler(res, "User login successful", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
  }

  async profile(req, res, next){
    try {
      const data = await User.findByPk(req.user)
      return responsHandler(res, "User profile retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()