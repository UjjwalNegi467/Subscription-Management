

const express = require("express");
const router = express.Router();
const User = require("../model");
const jwt = require("jsonwebtoken");
const { cancelSubscription } = require("../controller/user.controller");

//  Middleware to check JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//  Cancel subscription
router.post("/subscription/cancel", authMiddleware, cancelSubscription);

//  Get logged-in user info
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update subscription
router.put("/subscription", authMiddleware, async (req, res) => {
  const { plan } = req.body; // "$9", "$50", "$100"
  const user = await User.findByIdAndUpdate(
    req.userId,
    { subscription: plan },
    { new: true }
  ).select("-password");

  res.json({ message: "Subscription updated", user });
});

module.exports = router;
