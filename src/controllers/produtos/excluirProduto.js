const knex = require('../../../conexao');
const s3 = require('../../../sdk');

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex('produtos').where('id', id).first();

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado!' });
    }

    const produtoComPedido = await knex('pedido_produtos').where('produto_id', id).first();
    if (produtoComPedido)
      return res.status(404).json({
        mensagem: 'Não foi possivel excluir produto, pois existem pedidos com ele!',
      });

    const { produto_imagem } = produto;

    const ultimaBarra = produto_imagem.lastIndexOf('/');
    const nomeDoArquivo = produto_imagem.substring(ultimaBarra + 1);
    await s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: nomeDoArquivo,
      })
      .promise();

    await knex('produtos').where('id', id).del();

    return res.status(200).json({ mensagem: 'Produto excluido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao excluir o produto.', error: error.message });
  }
};

module.exports = excluirProduto;
