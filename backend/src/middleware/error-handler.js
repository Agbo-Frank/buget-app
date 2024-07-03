const { ServiceError } = require("../utility/service-error.js");
const { StatusCodes } = require("http-status-codes");
const Logger = require("../utility/logger.js");

const logger = new Logger("error")

const ErrorHandler = async (err, _, res, next)=> { 

  process.on('uncaughtException', (reason) => {
    logger.log("uncaught Exception", reason)
    throw reason; // need to take care
  })

  process.on('unhandledRejection', error => {
    logger.log("uncaught Rejection", error)
    throw error; // need to take care
  })
    
  if(err){
      if(err instanceof ServiceError){
        return res.status(err.statusCode).json({
          status: err?.status,
          message: err?.message,
          data: err?.data
        })
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: "failed",
          message: "Internal server error",
          data: null
      })
  }
  next();
}

module.exports = ErrorHandler