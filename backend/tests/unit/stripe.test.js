jest.mock("../../src/config/stripe");

const stripe = require("../../src/config/stripe");
const { createCheckoutSession } = require("../../src/controller/stripe.controller");

describe("Stripe Controller Unit Test", () => {
  test("returns checkout url", async () => {
    stripe.checkout.sessions.create.mockResolvedValue({
      url: "http://stripe.com"
    });

    const req = {
      body: { plan: "$9" },
      userId: "123"
    };

    const res = {
      json: jest.fn()
    };

    await createCheckoutSession(req, res);

    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      url: "http://stripe.com"
    });
  });
});
