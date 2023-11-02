const { celebrate, Joi } = require('celebrate');

module.exports.movieCreateValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().min(2).max(100).required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().min(1).required(),
    year: Joi.string()
      .required()
      .pattern(/^[0-9]{4}$/)
      .custom((userYear, helper) => {
        const numberYear = Number(userYear);
        if (numberYear < 1880 || numberYear > new Date().getFullYear()) {
          return helper.message('Ошибка в данных года создания фильма');
        }
        return userYear;
      }),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .uri()
      .pattern(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.{1}[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    trailerLink: Joi.string()
      .required()
      .uri()
      .pattern(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.{1}[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    thumbnail: Joi.string()
      .required()
      .uri()
      .pattern(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.{1}[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    movieId: Joi.number().required(),
  }),
});

module.exports.movieDeleteValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required().hex(),
  }),
});
