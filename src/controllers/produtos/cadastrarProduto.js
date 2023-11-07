const knex = require('../../../conexao');
require('dotenv').config();
const { upload } = require('../../utils/uploadS3');

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file } = req;
  try {
    const categoriaExists = await knex('categorias').where('id', categoria_id).first();

    if (!categoriaExists) return res.status(400).json({ mensagem: 'Categoria não existe!' });
    const produtos = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };
    const novoProduto = await knex('produtos').insert(produtos).returning('*');

    if (file) {
      const id = novoProduto[0].id;

      const { url } = await upload(process.env.KEY_ID, file.buffer, file.mimetype);

      const produtoImagem = await knex('produtos')
        .update({ produto_imagem: url })
        .where({ id })
        .returning('*');
      return res.status(201).json(produtoImagem[0]);
    }

    return res.status(201).json(novoProduto[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensagem: error.message });
  }
};
module.exports = cadastrarProduto;
