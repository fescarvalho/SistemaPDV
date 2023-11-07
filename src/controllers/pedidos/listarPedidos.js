const knex = require('../../../conexao');
const getResult = require('../../utils/listarPedidoFuncao');

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;
  const query = knex('pedidos')
    .select(
      'pedidos.id as pedido.id',
      'pedidos.valor_total as pedido.valor_total',
      'pedidos.observacao as pedido.observacao',
      'pedidos.cliente_id as pedido.cliente_id',
      'pedido_produtos.id as pedido_produtos.id',
      'pedido_produtos.quantidade_produto as pedido_produtos.quantidade_produto',
      'pedido_produtos.valor_produto as pedido_produtos.valor_produto',
      'pedido_produtos.pedido_id as pedido_produtos.pedido_id',
      'pedido_produtos.produto_id as pedido_produtos.produto_id',
    )
    .innerJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
    .orderBy('pedidos.id', 'asc');

  try {
    if (!cliente_id) {
      const pedido = await query;

      const pedidos = getResult(pedido);

      if (!pedidos) return res.status(200).json({ mensagem: 'Não existem pedidos cadastrados!' });
      return res.status(200).json(pedidos);
    }

    const pedido = await query.where('pedidos.cliente_id', cliente_id);

    const pedidos = getResult(pedido);
    if (!pedidos)
      return res.status(200).json({ mensagem: 'Cliente não possui pedidos realizados!' });

    return res.status(200).json(pedidos);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = listarPedidos;
