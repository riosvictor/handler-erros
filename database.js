const { PrimaryKeyError } = require("./error");

// Simulação de banco de dados assíncrono
const database = {
  async findUserById(id) {
    // Simulando delay e possíveis casos de erro
    await new Promise(resolve => setTimeout(resolve, 100));
    const users = [{ id: 1, name: "Alice" }];
    return users.find(user => user.id === id);
  },

  async createUser(user) {
    // Simulando delay e possíveis casos de erro
    await new Promise(resolve => setTimeout(resolve, 100));

    if (user.id === 1) {
      throw new PrimaryKeyError("ID já existe.");
    }

    return { id: 2, ...user };
  }
};

module.exports = database;