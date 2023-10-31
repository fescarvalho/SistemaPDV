require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/routes');

const servidor = express();
servidor.use(express.json());
servidor.use(routes);
servidor.listen(process.env.PORT || 9001);

module.exports = servidor;
