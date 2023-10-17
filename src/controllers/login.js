const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knex = require('../../conexao');

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json({ mensagem: 'É obrigatório email e senha' });
  }

  try {
    const user = await knex('usuarios').where('email', email);

    if (user.rowCount === 0) {
      return res.status(400).json({ mensagem: 'O usuario não foi encontrado' });
    }

    const usuario = user[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: 'Email e/ou senha não confere' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.PASSWORD_HASH, {
      expiresIn: '8h',
    });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
