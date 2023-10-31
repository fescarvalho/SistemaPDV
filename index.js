require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/routes');
const servidor = express();

app.listen(process.env.PORT || 8080);
servidor.use(express.json());
servidor.use(routes);

module.exports = servidor;
