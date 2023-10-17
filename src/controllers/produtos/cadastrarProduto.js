const knex = require('../../../conexao');

const cadastrarProduto = async (req, res) => {
  const { categoria_id } = req.body;
  try {
    const categoriaExists = await knex('categorias').where('id', categoria_id);

    if (categoriaExists.length < 1)
      return res.status(400).json({ mensagem: 'Categoria não existe!' });

    const newProduct = {
      ...req.body,
    };

    await knex('produtos').insert(newProduct);
    return res
      .status(200)
      .json({ mensagem: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    return res.status(200).json({ mensagem: error.message });
  }
};

module.exports = cadastrarProduto;
