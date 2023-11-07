const express = require('express');

const upload = require('../utils/multer');
const { schemaProduto } = require('../utils/validations/schemas');
const listarCategorias = require('../controllers/categorias/listarCategorias');
const createUser = require('../controllers/usuarios/criarUsuario');
const updateUser = require('../controllers/usuarios/atualizarUsuario');
const detalharPerfil = require('../controllers/usuarios/detalharPerfil');
const login = require('../controllers/usuarios/login');
const validationCreate = require('../middlewares/middlewareValidacoes');
const midCadastrarPedido = require('../middlewares/midCadastrarPedido');
const { schemaUsario, schemaCliente, schemaPedido } = require('../utils/validations/schemas');
const verifyToken = require('../middlewares/verifytoken');
const cadastrarProduto = require('../controllers/produtos/cadastrarProduto');
const editarCliente = require('../controllers/clientes/editarCliente');
const detalharCliente = require('../controllers/clientes/detalharCliente');
const excluirProduto = require('../controllers/produtos/excluirProduto');
const listclient = require('../controllers/clientes/listarclient');
const { editDadosprod } = require('../controllers/produtos/editarProd');
const listarProdutos = require('../controllers/produtos/listarProdutos');
const cadastrarCliente = require('../controllers/clientes/cadastrarCliente');
const detalharProduto = require('../controllers/produtos/detalharProduto');
const cadastrarPedido = require('../controllers/pedidos/cadastrarPedido');
const listarPedidos = require('../controllers/pedidos/listarPedidos');

const routes = express();

routes.get('/categoria', listarCategorias);

routes.post('/login', login);
routes.post('/usuario', validationCreate(schemaUsario), createUser);
routes.get('/usuario', verifyToken, detalharPerfil);
routes.put('/usuario', verifyToken, validationCreate(schemaUsario), updateUser);

routes.put('/cliente/:id', verifyToken, validationCreate(schemaCliente), editarCliente);
routes.get('/cliente/:id', verifyToken, detalharCliente);
routes.get('/cliente', verifyToken, listclient);
routes.post('/cliente', verifyToken, validationCreate(schemaCliente), cadastrarCliente);

routes.get('/produto', verifyToken, listarProdutos);
routes.get('/produto/:id', verifyToken, detalharProduto);
routes.delete('/produto/:id', verifyToken, excluirProduto);
routes.post(
  '/produto',
  verifyToken,
  upload.single('produto_imagem'),
  validationCreate(schemaProduto),
  cadastrarProduto,
);
routes.put(
  '/produto/:id',
  verifyToken,
  upload.single('produto_imagem'),
  validationCreate(schemaProduto),
  editDadosprod,
);

routes.post(
  '/pedido',
  verifyToken,
  validationCreate(schemaPedido),
  midCadastrarPedido,
  cadastrarPedido,
);

routes.get('/pedido', verifyToken, listarPedidos);
module.exports = routes;
