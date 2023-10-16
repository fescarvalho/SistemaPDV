const express = require('express');
const { createUser } = require('../controllers/criarUsuario');
const { updateUser } = require('../controllers/atualizarUsuario');
const { detalharPerfil } = require('../controllers/detalharPerfil');
const { listarCategorias } = require('../controllers/listarCategorias');
const { login } = require('../controllers/login');
const validationCreate = require('../middlewares/middleware');
const schemaUsario = require('../utils/validations/schemaUsario');
const verifyToken = require('../middlewares/verifytoken');
const routes = express();

routes.get('/', (req, res)=>  res.send(200).json({message: 'Hellow World'}));
routes.get('/categoria', listarCategorias);
routes.post('/login', login);
routes.get('/usuario', verifyToken, detalharPerfil);
routes.post('/usuario', validationCreate(schemaUsario), createUser);
routes.put('/usuario', verifyToken, validationCreate(schemaUsario), updateUser);

module.exports = routes;
