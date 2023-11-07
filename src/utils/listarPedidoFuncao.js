const getResult = (pedido) => {
  const formattedResult = pedido.map((row) => {
    return {
      pedido: {
        id: row['pedido.id'],
        valor_total: row['pedido.valor_total'],
        observacao: row['pedido.observacao'],
        cliente_id: row['pedido.cliente_id'],
      },
      pedido_produtos: pedido
        .filter((pedidoProduto) => pedidoProduto['pedido.id'] === row['pedido.id'])
        .map((pedidoProduto) => ({
          id: pedidoProduto['pedido_produtos.id'],
          quantidade_produto: pedidoProduto['pedido_produtos.quantidade_produto'],
          valor_produto: pedidoProduto['pedido_produtos.valor_produto'],
          pedido_id: pedidoProduto['pedido_produtos.pedido_id'],
          produto_id: pedidoProduto['pedido_produtos.produto_id'],
        })),
    };
  });

  const pedidosUnicos = formattedResult.filter((pedido, index, self) => {
    const firstIndex = self.findIndex((p) => p.pedido.id === pedido.pedido.id);
    return index === firstIndex;
  });
  return pedidosUnicos;
};

module.exports = getResult;
