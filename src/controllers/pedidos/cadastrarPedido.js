const knex = require('../../../conexao');
const confirmarPedido = require('../../utils/envioDeEmail/enviarEmail');

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;
  try {
    //valor total
    let total = 0;
    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;
      const produto = await knex('produtos').where('id', produto_id).first();
      const valor = produto.valor * quantidade_produto;
      total += valor;
    }
    //inserindo pedido
    await knex('pedidos').insert({
      cliente_id,
      observacao,
      valor_total: total,
    });

    //buscando id do pedido no banco
    const pedidoBanco = await knex('pedidos')
      .select('*')
      .orderBy('id', 'desc')
      .first();

    //inserindo pedido_produtos
    for (const produtosPedido of pedido_produtos) {
      const { produto_id, quantidade_produto } = produtosPedido;
      const produto = await knex('produtos').where('id', produto_id).first();
      await knex('pedido_produtos').insert({
        pedido_id: pedidoBanco.id,
        produto_id,
        quantidade_produto,
        valor_produto: produto.valor,
      });

      await knex('produtos')
        .where('id', produto_id)
        .decrement('quantidade_estoque', quantidade_produto);
    }

    //Enviando Email de confirmação

    confirmarPedido(cliente_id);

    return res.status(200).send({ message: 'Pedido registrado com sucesso!' });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = cadastrarPedido;
