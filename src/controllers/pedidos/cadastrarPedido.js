const knex = require('../../../conexao');
const confirmarPedido = require('../../utils/envioDeEmail/enviarEmail');

const calcularTotalPedido = async (pedido_produtos) => {
  let total = 0;

  await Promise.all(
    pedido_produtos.map(async (pedidoProduto) => {
      const { produto_id, quantidade_produto } = pedidoProduto;
      const produto = await knex('produtos').where('id', produto_id).first();
      const valor = produto.valor * quantidade_produto;
      total += valor;
    }),
  );

  return total;
};

const inserirPedidoNoBanco = async (cliente_id, observacao, total) => {
  const idPedido = await knex('pedidos')
    .insert({
      cliente_id,
      observacao,
      valor_total: total,
    })
    .returning('id');

  const { id } = idPedido[0];

  return id;
};

const inserirPedidoProdutos = async (pedido_id, pedido_produtos) => {
  await Promise.all(
    pedido_produtos.map(async (produtosPedido) => {
      const { produto_id, quantidade_produto } = produtosPedido;
      const produto = await knex('produtos').where('id', produto_id).first();
      await knex('pedido_produtos').insert({
        pedido_id,
        produto_id,
        quantidade_produto,
        valor_produto: produto.valor,
      });

      await knex('produtos')
        .where('id', produto_id)
        .decrement('quantidade_estoque', quantidade_produto);
    }),
  );
};

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const total = await calcularTotalPedido(pedido_produtos);

    const pedido_id = await inserirPedidoNoBanco(cliente_id, observacao, total);

    await inserirPedidoProdutos(pedido_id, pedido_produtos);

    // Enviando Email de confirmação
    await confirmarPedido(cliente_id);

    return res.status(200).send({ message: 'Pedido registrado com sucesso!' });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = cadastrarPedido;
