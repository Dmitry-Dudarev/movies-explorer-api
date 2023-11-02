const { errorCodes } = require('../constants/errorCodes');

class OwnershipError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCodes.INVALID_OWNERSHIP_ERROR_CODE;
    this.name = 'OwnershipError';
  }
}

module.exports = OwnershipError;
