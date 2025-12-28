process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../src/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const hashed = await bcrypt.hash("123456", 10);
  const user = await User.create({ name: "Test", email: "a@b.com", password: hashed });
  userId = user._id;
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Integration Tests", () => {
  test("GET /api/user/me", async () => {
    const res = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("a@b.com");
  });

  test("Cancel subscription", async () => {
    const res = await request(app)
      .post("/api/user/subscription/cancel")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user.subscription).toBe(null);
  });
});
