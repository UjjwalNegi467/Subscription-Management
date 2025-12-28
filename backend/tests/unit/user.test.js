const { cancelSubscription } = require("../../src/controller/user.controller");
const User = require("../../src/model");

jest.mock("../../src/model");

describe("User Controller Unit Tests", () => {
  test("cancelSubscription updates subscription to null", async () => {
    const mockUser = {
      name: "Test",
      subscription: null
    };

    //  Mock chained mongoose call
    User.findByIdAndUpdate.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser)
    });

    const req = { userId: "123" };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await cancelSubscription(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { subscription: null },
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "Subscription cancelled successfully",
      user: mockUser
    });
  });
});
