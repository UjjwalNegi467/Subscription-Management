jest.mock("../src/config/stripe", () => ({
  checkout: {
    sessions: {
      create: jest.fn()
    }
  },
  webhooks: {
    constructEvent: jest.fn()
  }
}));