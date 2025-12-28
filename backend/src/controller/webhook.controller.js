const stripe = require("../config/stripe");
const User = require("../model");

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(" Webhook signature failed:", err.message);
    return res.status(400).send("Webhook Error");
  }

  console.log("Webhook event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, plan } = session.metadata;

    console.log("🔁 Updating user:", userId, plan);

    await User.findByIdAndUpdate(
      userId,
      { subscription: plan },
      { new: true }
    );

    console.log("Subscription updated in DB");
  }

  res.json({ received: true });
};