const compiladorHTML = require('../../mail/CompiladorHTML');
const knex = require('../../../conexao');
const transporter = require('../../mail/sendMail');
const mail = require('../../mail/sendMailJet');

const confirmarPedido = async (clientID) => {
  const { nome, email } = await knex('clientes').where('id', clientID).first();

  const pedidoBanco = await knex('pedidos').select('*').orderBy('id', 'desc').first();
  const pedidos_produtos = await knex('pedido_produtos').where('pedido_id', pedidoBanco.id);

  const tabelaProdutosPromises = pedidos_produtos.map(
    async ({ produto_id, quantidade_produto, valor_produto }) => {
      const { descricao } = await knex('produtos').where('id', produto_id).first();
      const valorFormatado = (valor_produto.toFixed(2) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const valorTotalFormatado = (
        (quantidade_produto * valor_produto).toFixed(2) / 100
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      return `<tr>
      <td>${descricao}</td>
      <td>${quantidade_produto}</td>
      <td>${valorFormatado}</td>
      <td>${valorTotalFormatado}</td>
    </tr>`;
    },
  );
  const tabelaProdutosHTML = (await Promise.all(tabelaProdutosPromises)).join('');

  const valorTotalFormatado = (pedidoBanco.valor_total.toFixed(2) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const html = await compiladorHTML('./src/templatesMail/templateEMAIL.html', {
    nomeusuario: nome,
    tableprodutos: tabelaProdutosHTML,
    valortotaldopedido: valorTotalFormatado,
  });

  /* transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${nome} <${email}>`,
    subject: 'Confirmação de pedido',
    html,
  }); */

  await mail(email, nome, html);

  return null;
};

module.exports = confirmarPedido;
