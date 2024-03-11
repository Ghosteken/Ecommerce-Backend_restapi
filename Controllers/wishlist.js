// Import necessary models and utilities
import { Wishlist } from "../models/Wishlist";
import { Product } from "../models/Product";
import Customer from "../models/Customer"; 
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongodbId";

// Add a product to the wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  // Extract necessary data from request body and user context
  const { productId, count, color } = req.body;
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the customer by ID
    const customer = await Customer.findById(_id);
    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the wishlist associated with the customer
    let wishlist = await Wishlist.findOne({ orderby: _id });

    // If no wishlist exists, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({
        products: [{ product: productId, count, color, price: product.price }],
        orderby: _id,
      });
    } else {
      // If wishlist exists, check if the product is already added
      const existingItemIndex = wishlist.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        // If product is already in wishlist, return message
        return res.status(400).json({ message: "Product already in wishlist" });
      } else {
        // If product is not in wishlist, add it
        wishlist.products.push({ product: productId, count, color, price: product.price });
      }
    }

    // Calculate the wishlist total
    wishlist.cartTotal = wishlist.products.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    // Save the updated wishlist
    await wishlist.save();

    // Respond with the updated wishlist
    res.json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

// Remove a product from the wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  // Extract necessary data from request body and user context
  const { productId } = req.body;
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the wishlist associated with the customer
    let wishlist = await Wishlist.findOne({ orderby: _id });

    // If no wishlist exists, return error
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Filter out the product to be removed
    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    // Calculate the updated wishlist total
    wishlist.cartTotal = wishlist.products.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    // Save the updated wishlist
    await wishlist.save();

    // Respond with the updated wishlist
    res.json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

// Retrieve the user's wishlist
const getUserWishlist = asyncHandler(async (req, res) => {
  // Extract user ID from request context
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the wishlist associated with the customer and populate product details
    const wishlist = await Wishlist.findOne({ orderby: _id }).populate({
      path: "products.product",
      model: "Product",
    });
    
    // Respond with the user's wishlist
    res.json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

// Empty the user's wishlist
const emptyWishlist = asyncHandler(async (req, res) => {
  // Extract user ID from request context
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find and remove the user's wishlist
    await Wishlist.findOneAndRemove({ orderby: _id });
    
    // Respond with success message
    res.json({ message: "Wishlist emptied successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

// Export controller functions
export { addToWishlist, removeFromWishlist, getUserWishlist, emptyWishlist };
