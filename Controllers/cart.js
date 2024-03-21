const Cart = require( '../models/Cart.js');
const Product = require( '../models/Product.js');
const Customer = require( '../models/Customer.js');

const asyncHandler = require('express-async-handler');

const validateMongoDbId = require("../utils/validateMongodbId.js");


const addToCart = asyncHandler(async (req, res) => {

  const { productId, count, color } = req.body;
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the customer by ID
    const customer = await Customer.findById(_id);
    
    const product = await Product.findById(productId);

    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    let cart = await Cart.findOne({ orderby: _id });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({
        products: [{ product: productId, count, color, price: product.price }],
        orderby: _id,
      });
    } else {
      // If cart exists, update the existing item or add a new one
      const existingItemIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.products[existingItemIndex].count += count;
      } else {
        cart.products.push({ product: productId, count, color, price: product.price });
      }
    }

    // Calculate the cart total
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Remove a product from the cart
const removeFromCart = asyncHandler(async (req, res) => {
  // Extract necessary data from request body and user context
  const { productId } = req.body;
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the cart associated with the customer
    let cart = await Cart.findOne({ orderby: _id });

    // If no cart exists, return error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to be removed
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    // Calculate the updated cart total
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Update the count of a product in the cart
const updateCartItem = asyncHandler(async (req, res) => {
  // Extract necessary data from request body and user context
  const { productId, count } = req.body;
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the cart associated with the customer
    let cart = await Cart.findOne({ orderby: _id });

    // If no cart exists, return error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item to update in the cart
    const itemToUpdate = cart.products.find(
      (item) => item.product.toString() === productId
    );

    // If item is not found in the cart, return error
    if (!itemToUpdate) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the count of the item
    itemToUpdate.count = count;

    // Calculate the updated cart total
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Retrieve the user's cart
const getUserCart = asyncHandler(async (req, res) => {
  // Extract user ID from request context
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    // Find the cart associated with the customer and populate product details
    const cart = await Cart.findOne({ orderby: _id }).populate({
      path: "products.product",
      model: "Product",
    });
    
    // Respond with the user's cart
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// Empty the user's cart
const emptyCart = asyncHandler(async (req, res) => {
  // Extract user ID from request context
  const { _id } = req.user;
  
  // Validate the user ID
  validateMongoDbId(_id);
  
  try {
    await Cart.findOneAndRemove({ orderby: _id });
    
  
    res.json({ message: "Cart emptied successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports =  { addToCart, removeFromCart, updateCartItem, getUserCart, emptyCart };
