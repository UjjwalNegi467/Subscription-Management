const express = require("express");
const router = express.Router();
const User = require("../model");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");


router.get(
  "/subscriptions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const users = await User.find().select(
      "name email role subscription paymentStatus"
    );
    res.json(users);
  }
);

module.exports = router;