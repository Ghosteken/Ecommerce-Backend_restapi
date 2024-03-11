const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart');
const wishlistController = require('../Controllers/wishlist');

// Cart APIs
router.post("/api/customers/cart", cartController.addToCart);
router.get("/api/customers/cart", cartController.getAllCartItems);
router.put("/api/customers/cart/:productId", cartController.updateCartItem);
router.delete("/api/customers/cart/:productId", cartController.removeCartItem);
router.delete("/api/customers/cart", cartController.removeAllCartItems);

// Wishlist APIs
router.post("/api/customers/wishlist", wishlistController.addToWishlist);
router.get("/api/customers/wishlist", wishlistController.getAllWishlistItems);
router.delete("/api/customers/wishlist/:productId", wishlistController.removeWishlistItem);
router.delete("/api/customers/wishlist", wishlistController.removeAllWishlistItems);
router.put("/api/customers/moveWishlistToCart/:productId", wishlistController.moveWishlistToCart);
router.put("/api/customers/moveCartToWishlist/:productId", wishlistController.moveCartToWishlist);

module.exports = router;
