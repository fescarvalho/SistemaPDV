const knex = require('./../../conexao');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const userId = req.userId;

  try {
    const userEmail = await knex('usuarios')
      .where('email', email)
      .whereNot('id', userId);

    if (userEmail.length > 0)
      return res.status(400).json({ message: 'Email ja cadastrado.' });

    const senhaCripto = await bcrypt.hash(senha, 10);

    await knex('usuarios').where('id', userId).update({
      nome: nome,
      email: email,
      senha: senhaCripto,
    });

    return res.status(200).json({ message: 'Usuario atualizado com sucesso.' });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { updateUser };
