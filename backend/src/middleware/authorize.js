const { User } = require("../models/index.js");
const { NotFoundException, BadRequestException, UnauthorizedException } = require("../utility/service-error.js");

module.exports.authorize = (roles) => async (req, _, next) => {
  try{
    const user = await User.findByPk(req.user)
    if(!user) throw new NotFoundException("User not found");
    if(user.status === 'pending') throw new BadRequestException("User's account hasn't been activated");
    // if(!roles.includes(user.role)) throw new UnauthorizedException("Unauthorized user");

    req.role = user.role
    next();
  }
  catch(error){
    console.log(error)
    next(error);
  }
}