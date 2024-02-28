const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, 'Please enter the company name'],
    },
    companyLogo: {
      type: String,
      default: '',
    },
    contactInformation: {
      phone: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
      socialMediaLinks: {
        type: [String],
        default: [],
      },
    },
    storeLocations: [
      {
        address: {
          city: String,
          street: String,
          country: String,
          postCode: String,
        },
        productCategories: {
          type: [String],
          default: [],
        },
      },
    ],
    contractType: {
      type: String,
      default: '',
    },
    paymentInformation: {
      type: String,
      default: '',
    },
    cleaningInformation: {
      type: String,
      default: '',
    },
    damagePolicy: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;
