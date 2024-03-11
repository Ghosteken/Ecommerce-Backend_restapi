import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100,
  },
  description: {
    required: true,
    type: String,
    maxlength: 10000,
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export { Wishlist };
