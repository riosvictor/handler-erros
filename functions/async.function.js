const { Result } = require("../error.model");
const database = require("../database");
const { PrimaryKeyError } = require("../error");

async function getUser(id) {
  if (typeof id !== "number") {
    return Result.err("ID deve ser um número.");
  }

  try {
    const user = await database.findUserById(id);

    if (!user) {
      return Result.err("Usuário não encontrado.");
    }

    return Result.ok(user);
  } catch (e) {
    return Result.err("Erro ao conectar-se ao banco de dados.");
  }
}

async function createUser(user) {
  if (typeof user?.id !== "number") {
    return Result.err("ID deve ser um número.");
  }

  try {
    const newUser = await database.createUser(user);

    return Result.ok(newUser);
  } catch (e) {
    if (e.name === PrimaryKeyError.name) {
      return Result.err(`Erro de PK: ${e.message}`);
    }

    return Result.err(e.message);
  }
}

module.exports = { getUser, createUser };
