
const stripe = require("../config/stripe");

exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body;
  const userId = req.userId;

  const prices = {
    "$9": 900,
    "$50": 5000,
    "$100": 10000
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${plan} Subscription` },
          unit_amount: prices[plan],
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/subscription?success=true",
    cancel_url: "http://localhost:3000/subscription?cancelled=true",
    metadata: { userId, plan },
  });

  res.json({ url: session.url });
};