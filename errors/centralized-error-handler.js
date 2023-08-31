const { errorCodes } = require('../constants/errorCodes');
const { errorMessages } = require('../constants/errorMessages');

const { ANOTHER_ERROR_CODE } = errorCodes;

module.exports.centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = ANOTHER_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === ANOTHER_ERROR_CODE
      ? errorMessages.anotherErrorMessage
      : message,
  });
  next();
};
