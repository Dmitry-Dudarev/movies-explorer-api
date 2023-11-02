require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { config } = require('../constants/config');
const NotFoundError = require('../errors/not-found-error');
const EmailDuplicationError = require('../errors/email-duplication-error');
const ValidationError = require('../errors/validation-error');
const { errorMessages } = require('../constants/errorMessages');
const { successMessages } = require('../constants/successMessages');

// регистрация пользователя
// возвращает объект созданного пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  // создаем хеш из полученного пароля
  bcrypt.hash(password, 10)
    .then((hash) => {
      // передаем данные для создания нового пользователя в БД
      // для поля password передаем хешированные данные пароля
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          // метод .create вернет все поля пользователя не взирая на указания
          // схемы. Чтобы этого избежать выполним преобразование объекта схемы
          // и удалим поле password вручную
          const userJSON = user.toJSON();
          delete userJSON.password;
          res.send(userJSON);
        })
        .catch((err) => {
          if (err.code === 11000) {
            const error = new EmailDuplicationError(errorMessages
              .createUserEmailDuplicationErrorMessage);
            next(error);
          } else if (err.name === 'ValidationError') {
            const error = new ValidationError(errorMessages
              .createUserValidationErrorMessage);
            next(error);
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// аутентификация пользователя
// возвращает токен в куки
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  // воспользуемся кастомным методом для схемы user:
  // будет произведен поиск по БД и проверка пароля
  // в случае успеха метод вернет объект пользователя
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен, в пейлоуд направим только id
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.devSecretKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
        })
        .send({ message: successMessages.loginMessage });
    })
    .catch(next);
};

// выход из учетной записи
module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
    });
    res.send({ message: successMessages.logoutMessage });
  } catch (err) {
    next(err);
  }
};

// получение информации о текущем пользователе
module.exports.getCurrentUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages
          .getCurrentUserDataNotFoundErrorMessage);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

// редактирование данных пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  // после редактирования вернется обновленный объект пользователя
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages
          .updateUserNotFoundErrorMessage);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(errorMessages
          .updateUserValidationErrorMessage);
        next(error);
      } else {
        next(err);
      }
    });
};
