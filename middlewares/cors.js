const cors = require('cors');

const allowedCors = [
  'https://brunneng.nomoredomainsrocks.ru',
  'http://brunneng.nomoredomainsrocks.ru',
];

const corsSettings = {
  origin: allowedCors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = (cors(corsSettings));
