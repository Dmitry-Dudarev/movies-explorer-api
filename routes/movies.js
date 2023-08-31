const router = require('express').Router();
const express = require('express');

const { movieCreateValidation, movieDeleteValidation } = require('../validation/movieValidation');

const {
  createMovie,
  getAllUserMovies,
  deleteMovie,
} = require('../controllers/movies');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// добавление фильма в БД
router.post('/', movieCreateValidation, createMovie);

// поиск всех фильмов
// сохраненных данным пользователем
router.get('/', getAllUserMovies);

// удаление фильма
router.delete('/:movieId', movieDeleteValidation, deleteMovie);

module.exports = router;
