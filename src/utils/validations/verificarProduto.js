const verificarProdutos = async (pedidoProdutos, knex) => {
  const produtos = pedidoProdutos.map(({ produto_id }) => produto_id);

  const produtosExistem = await knex('produtos').whereIn('id', produtos);

  const produtosNãoExistem = produtos.filter(
    (item) => !produtosExistem.some((produto) => produto.id === item),
  );

  return produtosNãoExistem;
};

module.exports = verificarProdutos;
