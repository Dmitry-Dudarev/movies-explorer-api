require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimiter } = require('./middlewares/rate-limiter');
// const cors = require('./middlewares/cors');
const { config } = require('./constants/config');

const routers = require('./routes/index');

const { PORT = 3000 } = process.env;
const DATABASE_URL = (process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : config.devDatabaseURL);

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://brunneng.nomoredomainsrocks.ru',
    'http://brunneng.nomoredomainsrocks.ru',
  ];
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});
app.use(helmet({
  hsts: false,
  xssFilter: false,
}));
app.use(rateLimiter);
app.use(cookieParser());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors);

app.use(routers);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
