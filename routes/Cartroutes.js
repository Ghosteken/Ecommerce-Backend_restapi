const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateCartItem,
  getUserCart,
  emptyCart,
} = require("../Controllers/cart");


const router = express.Router();


router.post("/add-to-cart",  addToCart);


router.post("/remove-from-cart",  removeFromCart);


router.post("/update-cart-item", updateCartItem);


router.get("/user-cart", getUserCart);


router.delete("/empty-cart", emptyCart);


module.exports = router;
