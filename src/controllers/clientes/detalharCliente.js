const knex = require('../../../conexao');

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex('clientes').where('id', id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar o cliente.', error: error.message });
  }
};

module.exports = detalharCliente;
