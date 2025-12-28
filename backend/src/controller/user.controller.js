const User = require("../model");

exports.cancelSubscription = async (req, res) => {
  try {
    const userId = req.userId; // must match auth middleware

    // Update subscription to null
    const user = await User.findByIdAndUpdate(
      userId,
      { subscription: null },
      { new: true } // return updated document
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Subscription cancelled successfully",
      user, // must send full updated user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};