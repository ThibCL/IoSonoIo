class BadRequestError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name

    this.status = 400
  }

  statusCode() {
    return this.status
  }
}

module.exports = BadRequestError
