const mongoose = require('mongoose');

const wishlistschema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  cartTotal: Number,
  totalAfterDiscount: Number,
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
},
{
  timestamps: true,
});

const Wishlist = mongoose.model('Category', wishlistschema);
module.exports =  {Wishlist};
