const knex = require('../../../conexao');

const listclient = async (req, res) => {
  try {
    const listall = await knex('clientes');
    return res.status(200).json(listall);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
module.exports = listclient;
