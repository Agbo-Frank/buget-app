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
  ServiceError, BadRequestException, UnauthorizedException
}