const { errorCodes } = require('../constants/errorCodes');

class EmailDuplicationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCodes.EMAIL_DUPLICATION_ERROR_CODE;
    this.name = 'EmailDuplicationError';
  }
}

module.exports = EmailDuplicationError;
