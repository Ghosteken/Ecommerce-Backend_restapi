const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,

      trim: true,
      unique: true,
      required: [true, 'Please enter your email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
      minLength: [6, 'Password must be up to 6 characters'],
    },
    userType: {
      type: String,
      enum: ['customer'],
      default: 'customer',
    },
    photo: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    isBlocked: {
        type: Boolean,
        default: false,
      },
    },
    address: {
      type: String,
      default: '',
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
