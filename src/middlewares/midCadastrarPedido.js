const knex = require('../../conexao');
const verificarProdutos = require('../utils/validations/verificarProduto');
const verificarEstoque = require('../utils/validations/verificarEstoque');

const midCadastrarPedido = async (req, res, next) => {
  try {
    const { cliente_id, pedido_produtos } = req.body;
    //validação do cliente
    const clienteExists = await knex('clientes')
      .where('id', cliente_id)
      .first();
    if (!clienteExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
    }
    //validacao pedido vazio
    if (pedido_produtos.length < 1)
      return res
        .status(400)
        .json({ mensagem: 'Insira pelo menos 1 item no pedido.' });

    //validação se todos os produtos existem
    const produtosNaoEncontrados = await verificarProdutos(
      pedido_produtos,
      knex,
    );
    if (produtosNaoEncontrados.length > 0) {
      return res.status(404).json({
        mensagem: `Os produtos de id ${produtosNaoEncontrados.join(
          ', ',
        )} não existem`,
      });
    }

    //validacao do estoque
    const estoque = await verificarEstoque(pedido_produtos, knex);
    if (estoque !== null) return res.status(400).json({ mensagem: estoque });

    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = midCadastrarPedido;
