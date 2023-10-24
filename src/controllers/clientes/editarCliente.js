const knex = require('../../../conexao');

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { email, cpf } = req.body;

  try {
    const cliente = await knex('clientes').where('id', id).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
    }
    const mesmoCliente = await knex('clientes')
      .where((builder) => {
        builder.where('email', email).orWhere('cpf', cpf);
      })
      .whereNot('id', id);
    if (mesmoCliente.length > 0)
      return res.status(400).json({ message: 'Email e/ou CPF já cadastrado.' });

    await knex('clientes')
      .where('id', id)
      .update({ ...req.body });

    return res
      .status(200)
      .json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    return res.status(200).json({ mensagem: error.message });
  }
};

module.exports = editarCliente;
