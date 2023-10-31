const transporter = require('../../mail/sendMail');
const compiladorHTML = require('../../mail/CompiladorHTML');
const knex = require('../../../conexao');
const mail = require('../../mail/sendMailJet');

const confirmarPedido = async (clientID) => {
  const { nome, email } = await knex('clientes').where('id', clientID).first();

  const pedidoBanco = await knex('pedidos')
    .select('*')
    .orderBy('id', 'desc')
    .first();

  const pedidos_produtos = await knex('pedido_produtos').where(
    'pedido_id',
    pedidoBanco.id,
  );
  let tabelaProdutosHTML = '';

  for (const {
    produto_id,
    quantidade_produto,
    valor_produto,
  } of pedidos_produtos) {
    const { descricao } = await knex('produtos')
      .where('id', produto_id)
      .first();
    tabelaProdutosHTML += `<tr>
    <td>${descricao}</td>
    <td>${quantidade_produto}</td>
    <td>${(valor_produto.toFixed(2) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}</td>
    <td>${(
      (quantidade_produto * valor_produto).toFixed(2) / 100
    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
  </tr>`;
  }

  const html = await compiladorHTML(
    './src/utils/envioDeEmail/templatesMail/templateEMAIL.html',
    {
      nomeusuario: nome,
      tableprodutos: tabelaProdutosHTML,
      valortotaldopedido: `${(
        pedidoBanco.valor_total.toFixed(2) / 100
      ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
    },
  );

  /*   transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${nome} <${email}>`,
    subject: 'Confirmação de pedido',
    html,
  }); */

  await mail(email, nome, html);

  return null;
};

module.exports = confirmarPedido;
