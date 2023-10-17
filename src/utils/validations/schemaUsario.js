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
const schemaProduto = yup.object({
  descricao: yup.string().required('O campo descrição é obrigatório.'),
  quantidade_estoque: yup
    .number()
    .required('O campo quantidade é obrigatório.'),
  valor: yup.number().required('O campo valor é obrigatório.'),
  categoria_id: yup.number().required('O campo categoria_id é obrigatório.'),
});

module.exports = { schemaUsario, schemaProduto };
