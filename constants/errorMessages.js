module.exports.errorMessages = {
  // MOVIES
  findUserByCredentialsErrorMessage: 'Неверная почта или пароль',
  createMovieErrorMessage: 'Некорректные данные в описани фильма',
  deleteMovieOwnershipErrorMessage: 'Вы не можете удалять фильмы, созданные другими пользователями',
  deleteMovieNotFoundErrorMessage: 'Фильм с указанным _id не найден',
  // USERS
  createUserEmailDuplicationErrorMessage: 'Пользователь с такой почтой существует',
  createUserValidationErrorMessage: 'Некорректные данные пользователя',
  getCurrentUserDataNotFoundErrorMessage: 'Сбой при получении данных',
  updateUserNotFoundErrorMessage: 'Пользователь с указанным _id не найден',
  updateUserValidationErrorMessage: 'Некорректные данные пользователя',
  updateUserEmailDuplicationErrorMessage: 'Пользователь с такой почтой был зарегистрирован ранее',
  // AUTH
  authNoTokenErrorMessage: 'Нет токена в куки',
  authIncorrectTokenErrorMessage: 'Пройдите авторизацию',
  // PAGES
  notFoundPageErrorMessage: 'Страница не найдена',
  // OTHER
  anotherErrorMessage: 'На сервере произошла ошибка',
};
