const knex = require('../../../conexao');
const { upload } = require('../../utils/uploadS3');

const editDadosprod = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const produtoExists = await knex('produtos').where('id', id).first();
    if (!produtoExists) return res.status(400).json({ mensagem: 'Produto informado não existe!' });

    const categoriaExists = await knex('categorias').where('id', categoria_id).first();
    if (!categoriaExists)
      return res.status(400).json({ mensagem: 'Categoria informada não existe!' });

    if (file) {
      const { url } = await upload(file.originalname, file.buffer, file.mimetype);

      await knex('produtos').update({ produto_imagem: url }).where({ id }).returning('*');

      return res.status(201).json({ mensagem: 'Produto atualizado com sucesso!' });
    }
    await knex('produtos')
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where({ id });
    return res.status(201).json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};
module.exports = { editDadosprod };
