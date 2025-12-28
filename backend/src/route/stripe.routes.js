


const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controller/stripe.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

module.exports = router;


