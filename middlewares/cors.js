const cors = require('cors');

const allowedCors = [
  'https://.nomoreparties.co',
  'http://.nomoreparties.co',
];

const corsSettings = {
  origin: allowedCors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: '*',
};

module.exports = (cors(corsSettings));
