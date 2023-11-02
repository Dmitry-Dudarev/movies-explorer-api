const router = require('express').Router();
const express = require('express');

const { userUpdateValidation } = require('../validation/userValidation');

const { getCurrentUserData, updateUser } = require('../controllers/users');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// получение информации о текущем пользователе
router.get('/me', getCurrentUserData);

// редактирование данных пользователя
router.patch('/me', userUpdateValidation, updateUser);

module.exports = router;
