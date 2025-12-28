const express = require("express");
const cors = require("cors");

const authRoutes = require("./route/auth.routes");
const userRoutes = require("./route/user.routes");
const stripeRoutes = require("./route/stripe.routes");
const webhookRoutes = require("./route/webhook.routes");
const adminRoutes = require("./route/admin.routes");

const app = express();
app.use(cors());

//  Webhook must be raw
app.use("/api/stripe/webhook", webhookRoutes);

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//  DO NOT LOAD STRIPE ROUTES DURING TESTS
if (process.env.NODE_ENV !== "test") {
  app.use("/api/stripe", stripeRoutes);
}

module.exports = app;

