'use strict'

const StatusCode = {
  OK: 200,
  CREATED: 201,
}

const ReasonStatusCode = {
  OK: 'OK',
  CREATED: 'Created',
}

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = message || reasonStatusCode
    this.status = statusCode
    this.metadata = metadata
  }

  send(res, headers = {}) {
    // if (Object.keys(headers).length > 0) {
    //   res.set(headers)
    // }
    return res.status(this.status).json(this)
  }

  static create({ message, statusCode, metadata }) {
    new SuccessResponse({ message, statusCode, metadata })
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }

  // muốn xái static bên controller thay vì dùng new để tạo instance
  static create({ message, metadata }) {
    new OK({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.options = options
  }

  static create({ message, metadata, options }) {
    new CREATED({ message, metadata, options })
  }
}

module.exports = {
  OK,
  CREATED,
}
