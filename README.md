# Gerenciamento de estoque de livros
## Overview do projeto
Trata-se de un microserviço para expor APIs de CRUD de livros

### Tecnologias utilizadas:
* NodeJS
* Express
* Banco de dados ( MongoDB, Mysql)
* Testes (Jest)
* Docker
* Typescript

## Funcionalidades
### Cadastro de livro

**RF**
- Deve ser possível cadastrar um novo Livro no estoque.

**Regras de Negócio** 
- Não deve ser possível cadastrar um livro com um ISBN já existente.
- Não deve ser possível cadastrar um livro com estoque negativo.

### Listagem dos livros

- Deve ser possível listar todos os livros do estoque - divididos por páginas (informadas ou não na URL).
- Deve ser possível listar todos os livros do estoque - visualizando os nomes.
- Deve ser possível listar todas as informações do livro - passando o  ISBN como parâmetro.

### Atualização de dados de um livro

- Deve ser possível atualizar um livro do estoque - informando o ISBN do livro a ser atualizado.
- Deve ser possível atualizar nome, autor, descição e estoque do livro.
- Deve retornar os dados que foram atualizados de acordo com o respectivo ISBN.

**Regras de Negócio** 
- Não deve ser possível atualizar dados de um livro que não está no estoque (ISBN cadastrado no banco).
- Não deve ser possível atualizar o ISBN de um livro.
- Não deve ser possível atualizar o estoque de um livro para valores negativos.

### Remoção de um livro

- Deve ser possível deletar um livro do estoque - informando o ISBN do livro a ser deletado.
- Deve retornar uma mensagem informando que o livro foi deletado com sucesso.

**Regras de Negócio** 
- Não deve ser possível deletar um livro que não está no estoque (ISBN cadastrado no banco).
