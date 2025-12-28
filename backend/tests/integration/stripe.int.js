/**
 * Stripe Integration Tests
 * NOTE:
 * - Stripe is mocked
 * - No real Stripe API calls are made
 * - This test verifies API wiring, not Stripe itself
 */

process.env.NODE_ENV = "test";

const request = require("supertest");

/**
 * MOCK STRIPE FIRST 
 * This prevents Stripe from requiring a real API key
 */
jest.mock("../../src/config/stripe", () => ({
  checkout: {
    sessions: {
      create: jest.fn()
    }
  }
}));

const app = require("../../src/app");
const stripe = require("../../src/config/stripe");

describe("Stripe Integration Tests", () => {
  test("POST /api/stripe/checkout returns checkout URL", async () => {
    // arranging
    stripe.checkout.sessions.create.mockResolvedValue({
      url: "http://stripe.com"
    });

    // act
    const res = await request(app)
      .post("/api/stripe/checkout")
      .set("Authorization", "Bearer faketoken")
      .send({ plan: "$9" });

    // assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ url: "http://stripe.com" });
    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
  });
});
