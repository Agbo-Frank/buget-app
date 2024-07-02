const { validateRequest } = require("../utility/helpers");
const { header } = require("express-validator");
const jwt = require("../utility/jwt");

module.exports.guard = (req, _, next) => {
  try{
    validateRequest(req);
    const token = req.header('authorization');

    const decoded = jwt.verifyToken(token);
    
    req.user = decoded?.id;
    next();
  }
  catch(error){
    console.log(error)
    next(error);
  }
}