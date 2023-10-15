const yup = require('yup');
const schemaUsario = yup.object({
  nome: yup.string().required('O campo nome é obrigatório.'),
  email: yup
    .string()
    .email('Por favor, insira um email válido.')
    .required('O campo email é obrigatório.'),
  senha: yup
    .string()
    .min(5, 'A senha deve conter no minimo 5 caracteres.')
    .required('O campo senha é obrigatório.'),
});

module.exports = schemaUsario;
