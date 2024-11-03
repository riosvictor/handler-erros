const { Result } = require("../error.model");

function parseUserJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);

    if (!data.name) {
      return Result.err("Campo 'name' está ausente.");
    }
    if (typeof data.age !== "number") {
      return Result.err("Campo 'age' deve ser um número.");
    }

    return Result.ok(data);
  } catch (e) {
    return Result.err("JSON inválido.");
  }
}

module.exports = { parseUserJson };
