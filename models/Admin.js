const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
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
      enum: ['admin'],
      default: 'admin',
    },
    accessLevel: {
      type: Number,
      default: 3, 
    },
    accessToCustomerManagementData: {
      type: Boolean,
      default: true,
    },
    accessToRetailerManagementData: {
      type: Boolean,
      default: true,
    },
    accessToFinancialData: {
      type: Boolean,
      default: true,
    },
    accessToTrackingData: {
      type: Boolean,
      default: true,
    },
    accessToPlatformSettings: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
