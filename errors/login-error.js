const { errorCodes } = require('../constants/errorCodes');

class LoginError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCodes.LOGIN_ERROR_CODE;
    this.name = 'LoginError';
  }
}

module.exports = LoginError;
