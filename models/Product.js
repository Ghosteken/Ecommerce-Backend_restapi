import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dateRangeSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter product name"],
    },
    productId: { type: String, unique: true },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    quantity: {
      required: [
        true,
        "Please enter the number of items that present and this number must be a positive integer",
      ],
      type: Number,
      validate: {
        validator: function (value) {
          if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Quantity must be a positive integer");
          }
          return true;
        },
      },
      maxlength: 10000,
    },

    images: {
      type: Array,
      default: [],
    },
    price: {
      required: [true, "Please enter the price !"],
      type: Number,
      validate: {
        validator: (value) => {
          // validation function to check if price positive integer
          if (!Number.isInteger(value)) return false;
          if (value < 0) return false;
          return true;
        },
        message:
          "Price must be a positive integer or equal to zero if it is free",
      },
      maxlength: 10000,
    },
    category: {

        type: String,
        required: true,
      ref: 'Category',

      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    size: {
      type: Array,
      default: [],
    },
    color: {
      type: Array,
      default: [],
    },
    unavailableDates: {
      type: [dateRangeSchema],
      default: [],
    },
  },
  { timestamps: true },
  { _id: false }
);

productSchema.statics.generateProductId = async function () {
  let newProductId;
  const prefix = "AED";
  const randomNumber = Math.floor(100 + Math.random() * 900); // Generates a random 3-digit number

  do {
    newProductId = `${prefix}${randomNumber}`;
  } while (await this.findOne({ productId: newProductId }));

  return newProductId;
};


const Product = mongoose.model('Product', productSchema);
const DateRange = mongoose.model("DateRange", dateRangeSchema);


export { Product, DateRange };

