const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  emptyWishlist,
} = require("../Controllers/wishlist"); 

// const { authMiddleware } = require("../middlewares/authMiddleware"); // Assuming authentication middleware is required

const router = express.Router();

// Add a product to the wishlist
router.post("/add-to-wishlist", authMiddleware, addToWishlist);

// Remove a product from the wishlist
router.post("/remove-from-wishlist", authMiddleware, removeFromWishlist);

// Retrieve the user's wishlist
router.get("/user-wishlist", authMiddleware, getUserWishlist);

// Empty the user's wishlist
router.delete("/empty-wishlist", authMiddleware, emptyWishlist);

module.exports = router;
