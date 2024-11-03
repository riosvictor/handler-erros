const { getUser, createUser } = require("./functions/async.function");
const { parseUserJson } = require("./functions/sync.function");

/** Exemplo 1  Assíncrono com acesso ao banco de dados*/
(async () => {
  const results = [await getUser(1), await getUser(2), await getUser("abc")];

  console.log('\nResultados do Exemplo 1:');
  results.forEach((result, index) => {
    if (result.isErr()) {
      console.error(`Erro no caso ${index + 1}:`, result.value);
    } else {
      console.log(`Sucesso no caso ${index + 1}:`, result.value);
    }
  });
})();

/** Exemplo 2 Síncrono*/
const results = [
  parseUserJson('{"name": "Alice", "age": 25}'),
  parseUserJson('{"age": 25}'),
  parseUserJson('{"name": "Alice", "age": "25"}'),
  parseUserJson("Invalid JSON"),
];

console.log('\nResultados do Exemplo 2:');
results.forEach((result, index) => {
  if (result.isErr()) {
    console.error(`Erro no caso ${index + 1}:`, result.value);
  } else {
    console.log(`Sucesso no caso ${index + 1}:`, result.value);
  }
});

/** Exemplo 3 Assíncrono com acesso ao banco de dados*/
(async () => {
  const results = [
    await createUser({ id: 1, name: "Alice" }),
    await createUser({ id: 2, name: "John" }),
    await createUser({ id: "abc", name: "Bob" }),
  ];

  console.log('\nResultados do Exemplo 3:');
  results.forEach((result, index) => {
    if (result.isErr()) {
      console.error(`Erro no caso ${index + 1}:`, result.value);
    } else {
      console.log(`Sucesso no caso ${index + 1}:`, result.value);
    }
  });
})();
