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
    .min(1, 'O valor minimo para estoque é de 1')
    .required('O campo quantidade é obrigatório.'),
  valor: yup
    .number()
    .min(1, 'O valor minimo para valor é de 1')
    .required('O campo valor é obrigatório.'),
  categoria_id: yup.number().required('O campo categoria_id é obrigatório.'),
});

const schemaCliente = yup.object({
  nome: yup.string().required('O campo nome é obrigatório.'),
  email: yup
    .string()
    .email('Por favor, insira um email válido.')
    .required('O campo email é obrigatório.'),
  cpf: yup
    .string()
    .required('O campo CPF é obrigatório.')
    .min(11, 'CPF inválido.')
    .max(11, 'CPF inválido.'),
  cep: yup.string().min(8, 'CEP inválido.').max(8, 'CEP inválido.'),
  rua: yup.string(),
  numero: yup.number(),
  bairro: yup.string(),
  cidade: yup.string(),
  estado: yup.string(),
});
const schemaPedido = yup.object({
  cliente_id: yup.number().required('O campo nome é obrigatório.'),
  observacao: yup.string(),
  pedido_produtos: yup
    .array(
      yup.object({
        produto_id: yup.number().required('O campo produto_id é obrigatório.'),
        quantidade_produto: yup
          .number()
          .min(1, 'O valor minimo para quantidade_produto é de 1')
          .required('O campo quantidade_produto é obrigatório.'),
      }),
    )
    .required('O campo pedido_produtos é obrigatório.'),
});
module.exports = { schemaUsario, schemaProduto, schemaCliente, schemaPedido };
