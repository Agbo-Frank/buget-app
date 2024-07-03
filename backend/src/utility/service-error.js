const { StatusCodes } = require('http-status-codes');
  
class ServiceError extends Error {
  statusCode
  status
  data
  errorStack

  constructor(
    message,
    statusCode,
    data = null,
    status = "failed",
    errorStack
  ){
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    
    this.status = status;
    this.statusCode = statusCode;
    this.data = data
    this.errorStack = errorStack

    Error.captureStackTrace(this);
  }
}

class BadRequestException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.BAD_REQUEST, 
      data,
      "failed",
    );
  }
}
  
class UnauthorizedException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.UNAUTHORIZED,
      data,
      "failed"
    );
  }
}

class InternalServerErrorException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.INTERNAL_SERVER_ERROR, 
      data,
      "failed"
    );
  }
}

class ExpectationFailedException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.EXPECTATION_FAILED, 
      data,
      "failed"
    );
  }
}

class ServiceUnavailableException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.SERVICE_UNAVAILABLE, 
      data,
      "failed"
    );
  }
}

class NotFoundException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.NOT_FOUND, 
      data,
      "failed"
    );
  }
}

class TooManyRequestsException extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.TOO_MANY_REQUESTS, 
      data,
      "failed"
    );
  }
}

class ActionNotAllowed extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.FORBIDDEN, 
      data,
      "failed"
    );
  }
}

class UnprocessableContent extends ServiceError {
  constructor(message, data) {
    super(
      message, 
      StatusCodes.UNPROCESSABLE_ENTITY, 
      data,
      "failed"
    );
  }
}

class Logintimeout extends ServiceError {
  constructor(message, data) {
    super(message, 440, data, "failed");
  }
}

module.exports = {
  Logintimeout, UnprocessableContent,
  ActionNotAllowed, TooManyRequestsException,
  NotFoundException, ServiceUnavailableException,
  ServiceError, BadRequestException
}

// class ProviderError extends Error {
//   statusCode
//   status
//   data
//   message, status;
//   errorStack

//   constructor(servicestatus, errorStack?){
//     super(errorStack?.response?.data.message || errorStack?.message);
//     Object.setPrototypeOf(this, new.target.prototype);

//     this.statusCode = 400

//     if (errorStack instanceof AxiosError) {
//       const error_res = errorStack.response;

//       this.statusCode = error_res.status

//       if(error_res?.status === 401){
//         this.statusCode = 500
//         this.message = "Internal server error"

//         // trigger.sendEvent({
//         //   name: "send.email",
//         //   payload: {
//         //     to: ["agbofrank531@gmail.com"],
//         //     subject: `Puplar Error Log (${service} - service)`,
//         //     text: `From ${service}: ${errorStack}`
//         //   }
//         // })
//       }
//     }
    
//     this.status = "failed";
//     this.data = null
//     this.errorStack = errorStack

//     Error.captureStackTrace(this);
//   }
// }