const router = require('express').Router();
const { errors } = require('celebrate');
const userRouters = require('./users');
const movieRoutes = require('./movies');

const { userSignupValidation, userSigninValidation } = require('../validation/userValidation');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

const NotFoundError = require('../errors/not-found-error');
const { centralizedErrorHandler } = require('../errors/centralized-error-handler');
const { errorMessages } = require('../constants/errorMessages');

// логирование
router.use(requestLogger);

// НЕ ЗАЩИЩЕНО АУТЕНТИФИКАЦИЕЙ

// регистрация нового пользователя
router.post('/signup', userSignupValidation, createUser);

// аутентификация пользователя
router.post('/signin', userSigninValidation, login);

// ЗАЩИЩЕНО АУТЕНТИФИКАЦИЕЙ

// проверка токена
// добавление id пользователя в объект запроса
router.use(auth);

// выход из учетной записи
router.post('/signout', logout);

router.use('/users', userRouters);
router.use('/movies', movieRoutes);

// несуществующая страница
router.use((req, res, next) => {
  const error = new NotFoundError(errorMessages.notFoundPageErrorMessage);
  next(error);
});

// сборка логов ошибок
router.use(errorLogger);

// обработчик ошибок валидации Joi
router.use(errors());

// централизованный обработчик ошибок
router.use(centralizedErrorHandler);

module.exports = router;
