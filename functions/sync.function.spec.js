const { parseUserJson } = require("./sync.function");
const { Err, Ok } = require("../error.model");

describe("parseUserJson", () => {
  it("should return Result.ok when JSON string has valid name and age fields", () => {
    const jsonString = JSON.stringify({ name: "John Doe", age: 30 });

    const result = parseUserJson(jsonString);

    expect(result).toBeInstanceOf(Ok);
    expect(result.value).toEqual({ name: "John Doe", age: 30 });
  });

  const errorCases = [
    {
      title: "JSON is invalid",
      jsonString: "{",
      expected: "JSON inválido.",
    },
    {
      title: "property name is missing",
      jsonString: JSON.stringify({ age: 30 }),
      expected: "Campo 'name' está ausente.",
    },
    {
      title: "property age is not a number",
      jsonString: JSON.stringify({ name: "John Doe", age: "30" }),
      expected: "Campo 'age' deve ser um número.",
    },
  ]

  it.each(errorCases)("should return Result.err when %s", ({ jsonString, expected }) => {
    const result = parseUserJson(jsonString);

    expect(result).toBeInstanceOf(Err);
    expect(result.value).toBe(expected);
  })
});
