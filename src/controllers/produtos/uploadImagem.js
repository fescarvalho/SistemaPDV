const upload = require('../../utils/uploadS3');
const knex = require('../../../conexao');

const uploadImage = async (req, res) => {
  const { file } = req;
  const { buffer, mimetype, originalname } = file;
  const { id } = req.params;
  const key = `produto/${id}/${originalname}`;

  try {
    const product = await knex('produtos')
      .where({ id: Number(id) })
      .first();

    if (!product.image) {
      const fileImage = await upload.upload(key, buffer, mimetype);

      const image = await knex('produtos')
        .where({ id })
        .update({ produto_imagem: fileImage.url }, 'produto_imagem');

      return res.status(201).json(image);
    }

    const path = product.image.split(`${process.env.ENDPOINT}/`)[1];
    cnosole.log(path);

    await upload.deletar(path);

    const fileImage = await upload.upload(key, buffer, mimetype);

    const newImage = await knex('produtos')
      .where({ id })
      .update({ produto_imagem: fileImage.url }, 'produto_imagem');

    return res.status(201).json(newImage);
  } catch (error) {
    return res.status(400).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  uploadImage,
};
