const { getUser, createUser } = require("./async.function");
const database = require("../database");
const { Result } = require("../error.model");
const { PrimaryKeyError } = require("../error");

describe("getUser", () => {
  const spyFindUserById = jest.spyOn(database, "findUserById");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return Result.ok when a valid user ID is provided and user exists", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    spyFindUserById.mockResolvedValue(mockUser);

    const result = await getUser(1);

    expect(result).toEqual(Result.ok(mockUser));
  });

  const errorCases = [
    {
      title: "ID is not a number",
      id: "abc",
      expected: Result.err("ID deve ser um número."),
    },
    {
      title: "user not found",
      id: 1,
      mockValue: jest.fn().mockResolvedValue(),
      expected: Result.err("Usuário não encontrado."),
    },
    {
      title: "database connection error",
      id: 1,
      mockValue: jest
        .fn()
        .mockRejectedValue(new Error("Database connection error")),
      expected: Result.err("Erro ao conectar-se ao banco de dados."),
    },
  ];

  it.each(errorCases)(
    "should return Result.err when $title",
    async ({ id, expected, mockValue }) => {
      if (mockValue) {
        spyFindUserById.mockImplementation(mockValue);
      }

      const result = await getUser(id);

      expect(result).toEqual(expected);
    }
  );
});

describe("createUser", () => {
  const spyCreateUser = jest.spyOn(database, "createUser");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return Result.ok when a new user is created successfully", async () => {
    const user = { id: 2, name: "Bob" };

    const result = await createUser(user);

    expect(result).toEqual(Result.ok({ id: 2, name: "Bob" }));
    expect(spyCreateUser).toHaveBeenCalledWith(user);
  });

  const errorCases = [
    {
      title: "ID is not a number",
      user: { id: "abc", name: "Bob" },
      expected: Result.err("ID deve ser um número."),
    },
    {
      title: "Primary Key error",
      user: { id: 2, name: "Bob" },
      mockValue: jest
        .fn()
        .mockRejectedValue(new PrimaryKeyError("Primary Key violation")),
      expected: Result.err("Erro de PK: Primary Key violation"),
    },
    {
      title: "Database connection error",
      user: { id: 2, name: "Bob" },
      mockValue: jest
        .fn()
        .mockRejectedValue(new Error("Database connection error")),
      expected: Result.err("Database connection error"),
    },
  ];

  it.each(errorCases)(
    "should return Result.err when $title",
    async ({ user, expected, mockValue }) => {
      if (mockValue) {
        spyCreateUser.mockImplementation(mockValue);
      }

      const result = await createUser(user);

      expect(result).toEqual(expected);
    }
  );
});
