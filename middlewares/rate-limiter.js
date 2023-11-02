const expressRateLimiter = require('express-rate-limit');

module.exports.rateLimiter = expressRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 600,
  message: 'Слишком много запросов, попробуйте снова позже',
});
