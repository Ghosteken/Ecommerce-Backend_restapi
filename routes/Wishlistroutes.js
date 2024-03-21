const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  emptyWishlist,
} = require("../Controllers/wishlist"); 


const router = express.Router();

// Add a product to the wishlist
router.post("/add-to-wishlist",  addToWishlist);

// Remove a product from the wishlist
router.post("/remove-from-wishlist", removeFromWishlist);

// Retrieve the user's wishlist
router.get("/user-wishlist",  getUserWishlist);

// Empty the user's wishlist
router.delete("/empty-wishlist", emptyWishlist);

module.exports = router;
