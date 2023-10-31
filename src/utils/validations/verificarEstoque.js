const verificarEstoque = async (pedido_produtos, knex) => {
  for (const pedidoProduto of pedido_produtos) {
    const { produto_id, quantidade_produto } = pedidoProduto;

    const QuantidadeDoProdutoNoBanco = await knex('produtos')
      .select('quantidade_estoque')
      .where('id', produto_id)
      .first();

    if (QuantidadeDoProdutoNoBanco.quantidade_estoque < quantidade_produto) {
      return `Produto com ID ${produto_id} não possui quantidade suficiente em estoque.`;
    }
  }
  return null;
};

module.exports = verificarEstoque;
