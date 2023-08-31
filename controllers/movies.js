require('dotenv').config();

const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const OwnershipError = require('../errors/ownership-error');
const { errorMessages } = require('../constants/errorMessages');
const { successMessages } = require('../constants/successMessages');
const Movie = require('../models/movie');

// добавление фильма в БД
module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;
  // получаем объект пользователя из запроса
  // поле user добавлено в req при авторизации
  const { user } = req;
  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: user,
    movieId,
  })
    // формируем ответ сервера после добавления фильма в БД
    .then((movie) => {
      // чтобы расширить стандартный ответ сервера
      // дополнительными данными о пользователе
      // придется найти только что созданную запись о фильме
      Movie.findById(movie._id)
        .populate('owner', 'name email _id')
        .then((extendedMovie) => res.send(extendedMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError(errorMessages.createMovieErrorMessage);
        next(error);
      } else {
        next(err);
      }
    });
};

// поиск всех фильмов
// сохраненных данным пользователем
module.exports.getAllUserMovies = (req, res, next) => {
  const { user } = req;
  Movie.find({ owner: user })
    .populate('owner', 'name email _id')
    .then((movies) => res.send(movies))
    .catch(next);
};

// удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.deleteMovieNotFoundErrorMessage);
        // проверка владельца перед удалением
      } else if (String(req.user._id) !== String(movie.owner)) {
        throw new OwnershipError(errorMessages.deleteMovieOwnershipErrorMessage);
      } else {
        movie.deleteOne();
      }
    })
    .then(() => res.send({ message: successMessages.deleteMovieMessage }))
    .catch(next);
};
