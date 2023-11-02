const mongoose = require('mongoose');
const checkEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const LoginError = require('../errors/login-error');
const { errorMessages } = require('../constants/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return checkEmail(email);
      },
      message: 'Ошибка в данных почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// кастомный метод поиска зарегистрированного пользователя
// в случае успеха вернет объект пользователя из БД
userSchema.statics.findUserByCredentials = function (email, password) {
  // поиск по БД пользователей по почте
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new LoginError(errorMessages.findUserByCredentialsErrorMessage));
      }
      // сравнение пароля с хешем пароля из БД
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new LoginError(errorMessages.findUserByCredentialsErrorMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
