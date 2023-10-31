const NodeMailJet = require('node-mailjet');
const mailjet = NodeMailJet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRETE_KEY,
);
const mail = async (email, nome, data) => {
  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.EMAIL_NAME,
          },
          To: [
            {
              Email: email,
              Name: nome,
            },
          ],
          Subject: 'Confirmação de Pedido!',
          HTMLPart: data,
        },
      ],
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mail;
