const mongoose = require('mongoose');
const checkURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator(duration) {
        return Number.isInteger(duration);
      },
      message: 'Ошибка в данных продолжительности фильма',
    },
  },
  year: {
    type: String,
    required: true,
    validate: {
      validator(year) {
        return /^[0-9]{4}$/.test(year) && Number(year) >= 1880 && Number(year) <= new Date().getFullYear();
      },
      message: 'Ошибка в данных года создания фильма',
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(posterLink) {
        return checkURL(posterLink);
      },
      message: 'Ошибка в данных ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailerLink) {
        return checkURL(trailerLink);
      },
      message: 'Ошибка в данных ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnailLink) {
        return checkURL(thumbnailLink);
      },
      message: 'Ошибка в данных ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
