const express = require('express');
const listarCategorias = require('../controllers/categorias/listarCategorias');
const createUser = require('../controllers/usuarios/criarUsuario');
const updateUser = require('../controllers/usuarios/atualizarUsuario');
const detalharPerfil = require('../controllers/usuarios/detalharPerfil');
const login = require('../controllers/usuarios/login');
const validationCreate = require('../middlewares/middleware');
const {
  schemaUsario,
  schemaProduto,
  schemaCliente,
} = require('../utils/validations/schemaUsario');
const verifyToken = require('../middlewares/verifytoken');
const cadastrarProduto = require('../controllers/produtos/cadastrarProduto');
const editarCliente = require('../controllers/clientes/editarCliente');
const detalharCliente = require('../controllers/clientes/detalharCliente');
const routes = express();
const excluirProduto = require('../controllers/produtos/excluirProduto');
const listclient = require('../controllers/clientes/listarclient');
const editDadosprod = require('../controllers/produtos/editarProd');
const listarProdutos = require('../controllers/produtos/listarProdutos');
const cadastrarCliente = require('../controllers/clientes/cadastrarCliente');
const detalharProduto = require('../controllers/produtos/detalharProduto');

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
routes.put(
  '/cliente/:id',
  verifyToken,
  validationCreate(schemaCliente),
  editarCliente,
);
routes.get('/cliente/:id', verifyToken, detalharCliente);
routes.delete('/produto/:id', verifyToken, excluirProduto);
routes.put('/produto/:id', validationCreate(schemaProduto), editDadosprod);
routes.get('/cliente', verifyToken, listclient);
routes.get('/produto', verifyToken, listarProdutos);
routes.post(
  '/cliente',
  verifyToken,
  validationCreate(schemaCliente),
  cadastrarCliente,
);
routes.get('/produto/:id', verifyToken, detalharProduto);

module.exports = routes;
