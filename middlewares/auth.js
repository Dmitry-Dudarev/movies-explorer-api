require('dotenv').config();
const jwt = require('jsonwebtoken');
const { config } = require('../constants/config');
const LoginError = require('../errors/login-error');
const { errorMessages } = require('../constants/errorMessages');

// проверка полученного в куки токена
// id пользователя будет доступен "глобально"
module.exports = (req, res, next) => {
  // проверяем наличия токена в куки
  const token = req.cookies.jwt;
  if (!token) {
    return next(new LoginError(errorMessages.authNoTokenErrorMessage));
  }
  // создаем пустую переменную для пэйлоуда токена
  let payload;
  try {
    // проверяем подлинность токена,
    // записываем декодированный токен (пэйлоуд) в переменную
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.devSecretKey);
  } catch (err) {
    const error = new LoginError(errorMessages.authIncorrectTokenErrorMessage);
    return next(error);
  }
  // объекту запроса добавляем свойство user
  // переносим в него пэйлоуд из переменной (id пользователя)
  req.user = payload;
  return next();
};
