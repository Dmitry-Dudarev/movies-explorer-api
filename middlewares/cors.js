const cors = require('cors');

const allowedCors = [
  'https://Brunneng.nomoredomainsicu.ru',
  'http://Brunneng.nomoredomainsicu.ru',
];

const corsSettings = {
  origin: allowedCors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: '*',
};

module.exports = (cors(corsSettings));
