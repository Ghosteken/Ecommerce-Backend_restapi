import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
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

const Cart = mongoose.model('Category', cartSchema);
export { Cart };
