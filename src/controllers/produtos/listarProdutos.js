const knex = require('../../../conexao');

const listarProdutos = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    if (!categoria_id) {
      const listaDeProdutos = await knex('produtos');

      return res.status(200).json(listaDeProdutos);
    }

    const categoriaEncontrada = await knex('categorias').where(
      'id',
      categoria_id,
    );

    if (categoriaEncontrada.length === 0) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }

    const produtosDaCategoria = await knex('produtos').where(
      'categoria_id',
      categoria_id,
    );
    return res.status(200).json(produtosDaCategoria);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
module.exports = listarProdutos;
