const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signup, login } = require("../../src/controller/auth.controller");
const User = require("../../src/model");

jest.mock("../../src/model"); // mock DB
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth Controller Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("signup should create a new user", async () => {
    const req = { body: { name: "Test", email: "a@b.com", password: "123456" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedpassword");
    User.create.mockResolvedValue({ name: "Test", email: "a@b.com" });

    await signup(req, res);

  expect(User.create).toHaveBeenCalledWith({
  name: "Test",
  email: "a@b.com",
  password: "hashedpassword",
  role: "user"  
});
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("login should fail if user not found", async () => {
    const req = { body: { email: "a@b.com", password: "123" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});
