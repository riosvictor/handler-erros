# Handler Error

## Como iniciar o projeto
```bash
  npm install
  npm start
```

## Como rodar os testes
```bash
  npm test
```

### O que foi feito
- [ ] Criação da uma função síncrona que valida um JSON
- [ ] Criação de testes unitários para os seguintes cenários
  - [ ] JSON válido
  - [ ] JSON inválido, sem a chave "name"
  - [ ] JSON inválido, com a chave "age" com um valor não numérico
  - [ ] JSON inválido, não sendo um objeto

---

- [ ] Criação de uma função assíncrona que obtém um usuário de um banco de dados
- [ ] Criação de testes unitários para os seguintes cenários
  - [ ] Usuário encontrado
  - [ ] Erro ao buscar o usuário, id não é um número
  - [ ] Usuário não encontrado
  - [ ] Erro ao buscar o usuário, banco de dados indisponível

---

- [ ] Criação de uma função assíncrona que cria um usuário no banco de dados
- [ ] Criação de testes unitários para os seguintes cenários
  - [ ] Usuário criado
  - [ ] Erro ao criar o usuário, id não é um número
  - [ ] Erro ao criar o usuário, usuário já existe
  - [ ] Erro ao criar o usuário, banco de dados indisponível