CREATE DATABASE sistema_pdv


CREATE TABLE usuarios (
id SERIAL PRIMARY KEY ,
nome VARCHAR(100) NOT NULL,
email TEXT NOT NULL UNIQUE,
senha TEXT NOT NULL
)

CREATE TABLE categorias (
id SERIAL PRIMARY KEY,
descricao TEXT NOT NULL
)
CREATE TABLE produtos(
id SERIAL PRIMARY KEY,
descricao TEXT NOT NULL,
quantidade_estoque INTEGER,
valor INTEGER ,
categoria_id INTEGER REFERENCES categorias(id)
)

CREATE TABLE 
clientes
(
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100)NOT NULL UNIQUE,
cpf CHAR(11) NOT NULL UNIQUE,
cep CHAR(8),
rua VARCHAR(100),
numero INTEGER,
bairro VARCHAR(100),
cidade VARCHAR(100),
estado VARCHAR
)

INSERT INTO
  categorias (descricao)
VALUES
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

  
CREATE TABLE pedidos (
id SERIAL PRIMARY KEY ,
cliente_id INTEGER NOT NULL,
observacao TEXT ,
valor_total INTEGER NOT NULL
)


CREATE TABLE pedido_produtos (
id SERIAL PRIMARY KEY ,
pedido_id INTEGER NOT NULL,
produto_id INTEGER NOT NULL,
quantidade_produto INTEGER NOT NULL ,
valor_produto INTEGER NOT NULL
)


ALTER TABLE produtos ADD COLUMN produto_imagem TEXT



