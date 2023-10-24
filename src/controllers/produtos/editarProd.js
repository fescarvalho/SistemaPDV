const knex = require('../../../conexao');
const editDadosprod = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const produtoExists = await knex('produtos').where('id', id).first();
    if (!produtoExists)
      return res
        .status(400)
        .json({ mensagem: 'Produto informado não existe!' });

    const categoriaExists = await knex('categorias')
      .where('id', categoria_id)
      .first();
    if (!categoriaExists)
      return res
        .status(400)
        .json({ mensagem: 'Categoria informada não existe!' });

    await knex('produtos').where('id', id).update({
      descricao: descricao,
      quantidade_estoque: quantidade_estoque,
      valor: valor,
      categoria_id: categoria_id,
    });
    return res.status(200).json({ mensagem: 'Produto Atualizado' });
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno(${error.message})` });
  }
};

module.exports = editDadosprod;
