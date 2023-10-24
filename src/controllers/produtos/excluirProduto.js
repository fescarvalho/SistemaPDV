const knex = require('../../../conexao');

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex('produtos').where('id', id).first();

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    await knex('produtos').where('id', id).del();

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro ao excluir o produto.', error: error.message });
  }
};

module.exports = excluirProduto;
