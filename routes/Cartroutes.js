const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateCartItem,
  getUserCart,
  emptyCart,
} = require("../Controllers/cart");

// const { authMiddleware } = require("../middlewares/authMiddleware"); 

const router = express.Router();

// Add a product to the cart
router.post("/add-to-cart", authMiddleware, addToCart);

// Remove a product from the cart
router.post("/remove-from-cart", authMiddleware, removeFromCart);

// Update the count of a product in the cart
router.post("/update-cart-item", authMiddleware, updateCartItem);

// Retrieve the user's cart
router.get("/user-cart", authMiddleware, getUserCart);

// Empty the user's cart
router.delete("/empty-cart", authMiddleware, emptyCart);


module.exports = router;
