'use strict'

const StatusCode = {
  FORBIDEN: 403,
  CONFLICT: 409,
}

const ReasonStatusCode = {
  FORBIDEN: 'Bad request error',
  CONFLICT: 'Conflict error',
}

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode)
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDEN,
    statusCode = StatusCode.FORBIDEN
  ) {
    super(message, statusCode)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode)
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
}
