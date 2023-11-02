const { errorCodes } = require('../constants/errorCodes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCodes.VALIDATION_ERROR_CODE;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
