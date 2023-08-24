const mongoose = require('mongoose');
const checkEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
