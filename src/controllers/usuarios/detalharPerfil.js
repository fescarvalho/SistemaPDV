const knex = require('../../../conexao');

const detalharPerfil = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await knex('usuarios')
      .select('nome', 'email')
      .where('id', userId);

    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const profileData = user[0];

    return res.status(200).json(profileData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

module.exports = detalharPerfil;
