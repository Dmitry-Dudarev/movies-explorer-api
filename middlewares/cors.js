const cors = require('cors');

const allowedCors = [
  'https://brunneng.nomoredomainsrocks.ru',
  'http://brunneng.nomoredomainsrocks.ru',
];

const corsSettings = {
  origin: allowedCors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['*'],
  credentials: true,
};

module.exports = (cors(corsSettings));
