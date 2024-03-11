const express = require('express');
const router = express.Router();
const cart = require('../Controllers/cart');
const wishlist = require('../Controllers/wishlist');




// Cart APIs
router.post("/api/customers/cart", cart.addToCart);

router.get("/api/customers/cart", cart.getAllCartItems);

router.put("/api/customers/cart/:productId", cart.updateCartItem);

router.delete("/api/customers/cart/:productId", cart.removeCartItem);

router.delete("/api/customers/cart", cart.removeAllCartItems);

// Wishlist APIs
router.post("/api/customers/wishlist", wishlist.addToWishlist);

router.get("/api/customers/wishlist", wishlist.getAllWishlistItems);

router.delete("/api/customers/wishlist/:productId", wishlist.removeWishlistItem);

router.delete("/api/customers/wishlist", wishlist.removeAllWishlistItems);

// Move Wishlist to Cart API
router.put("/api/customers/moveWishlistToCart/:productId", wishlist.moveWishlistToCart);

// Move Cart to Wishlist API
router.put("/api/customers/moveCartToWishlist/:productId", wishlist.moveCartToWishlist);

module.exports = router;

