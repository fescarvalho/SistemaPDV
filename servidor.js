const express = require('express');
const routes = require('./src/routes/routes');

const servidor = express();
servidor.use(express.json());
servidor.use(routes);

module.exports = servidor;
