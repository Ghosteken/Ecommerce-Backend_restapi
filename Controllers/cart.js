const Customer = require('../models/Customer');
const { ObjectId } = require('mongoose').Types;

const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.query;
    const { days } = req.body;
    const user = await Customer.findOne({ _id: userId });
    let duplicate = false;

    // Check if the product is already in the user's cart
    user.cart.forEach((item) => {
      if (item.id.equals(productId)) { 
        duplicate = true;
      }
    });

    if (duplicate) {
      // If the product is already in the cart, increment its quantity
      await Customer.findOneAndUpdate(
        { _id: userId, "cart.id": ObjectId.createFromTime(productId) }, 
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );
      res.status(200).json(user.cart);
    } else {
      // If the product is not in the cart, add it
      user.cart.push({
        id: ObjectId.createFromTime(productId), 
        quantity: 1,
        date: Date.now(),
        days: days,
      });
      await user.save();
      res.status(200).json({
        status: "success",
        data: user.cart,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllCartItems = async (req, res) => {
  try {
    const user = await Customer.findOne({ _id: req.user._id });
    res.status(200).json({ status: "success", data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;
    
    const user = await Customer.findOneAndUpdate(
      {
        _id: userId,
        "cart.id": ObjectId.createFromTime(productId), 
      },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );
    
    res.status(200).json({ status: "success", data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.query;
    
    
    const user = await Customer.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { id: ObjectId.createFromTime(productId) } } }, 
      { new: true }
    );
    
    res.status(200).json({ status: "success", data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const removeAllCartItems = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    
    const user = await Customer.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: [] } },
      { new: true }
    );
    
    res.status(200).json({ status: "success", data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { addToCart, getAllCartItems, updateCartItem, removeCartItem, removeAllCartItems };
