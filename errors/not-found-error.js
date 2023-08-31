const { errorCodes } = require('../constants/errorCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCodes.NOT_FOUND_ERROR_CODE;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
