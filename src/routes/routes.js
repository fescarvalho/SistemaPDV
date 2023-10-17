const express = require('express');
const {
  listarCategorias,
} = require('../controllers/categorias/listarCategorias');
const { createUser } = require('../controllers/usuarios/criarUsuario');
const { updateUser } = require('../controllers/usuarios/atualizarUsuario');
const { detalharPerfil } = require('../controllers/usuarios/detalharPerfil');
const { login } = require('../controllers/usuarios/login');
const validationCreate = require('../middlewares/middleware');
const {
  schemaUsario,
  schemaProduto,
} = require('../utils/validations/schemaUsario');
const verifyToken = require('../middlewares/verifytoken');
const cadastrarProduto = require('../controllers/produtos/cadastrarProduto');
const routes = express();

routes.get('/categoria', listarCategorias);
routes.post('/login', login);
routes.post('/usuario', validationCreate(schemaUsario), createUser);
routes.get('/usuario', verifyToken, detalharPerfil);
routes.put('/usuario', verifyToken, validationCreate(schemaUsario), updateUser);
routes.post(
  '/produto',
  verifyToken,
  validationCreate(schemaProduto),
  cadastrarProduto,
);

module.exports = routes;
