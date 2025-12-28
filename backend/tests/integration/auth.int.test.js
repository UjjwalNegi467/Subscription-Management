process.env.NODE_ENV = "test";


const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const User = require("../../src/model");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth Integration Tests", () => {
  test("signup and login", async () => {
    const signupRes = await request(app)
      .post("/api/auth/signup")
      .send({ name: "Test", email: "a@b.com", password: "123456" });
    expect(signupRes.statusCode).toBe(201);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "a@b.com", password: "123456" });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
  });
});
