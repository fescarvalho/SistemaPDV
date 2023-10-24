const knex = require('../../../conexao');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    const userExists = await knex('usuarios').where('email', email).first();

    if (userExists)
      return res.status(400).send({ message: 'Email ja cadastrado!' });

    const senhaCripto = await bcrypt.hash(senha, 10);
    const usuario = {
      nome,
      email,
      senha: senhaCripto,
    };
    await knex('usuarios').insert(usuario).returning(['id', 'nome', 'email']);
    return res.status(200).send({ message: 'Usuario cadastrado com sucesso!' });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = createUser;
