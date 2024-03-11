import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);
export { Category };
