const knex = require('../../../conexao');

const cadastrarCliente = async (req, res) => {
  try {
    const { email, cpf, nome } = req.body;

    const cadastroExistente = await knex('clientes')
      .where('email', email)
      .orWhere('cpf', cpf)
      .first();

    if (cadastroExistente) {
      if (cadastroExistente.email === email) {
        console.log(email);
        return res.status(400).json({ mensagem: 'Email ja cadastrado!' });
      } else if (cadastroExistente.cpf.trim() === cpf) {
        return res.status(400).json({ mensagem: 'CPF ja cadastrado!' });
      }
    }

    const cliente = {
      ...req.body,
    };
    await knex('clientes')
      .insert(cliente)
      .returning(['id', 'nome', 'email', 'cpf']);
    return res
      .status(201)
      .json({ mensagem: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = cadastrarCliente;
