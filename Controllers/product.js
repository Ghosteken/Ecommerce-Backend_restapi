import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, size, color } = req.body;
    const imageUrls = [];

    if (req.files === undefined) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      size,
      color,
      images: imageUrls,
    });

    product.productId = await Product.generateProductId();
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    console.error('Error getting products:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ status: 'Failed', message: 'Invalid product ID' });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ status: 'Failed', message: 'Product not found' });
    }

    const product = await Product.findById({ _id: productId }).populate(
      'category',
    );

    const category = product?.category;
    const categoryDetails = await Category.findById(category);

    res.json({ status: 'Success', product, categoryDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Failed', error: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ status: 'Failed', message: 'Invalid product ID' });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ status: 'Failed', message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true },
    );

    res.json({
      status: 'Success',
      message: 'Product updated successfully',
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ status: 'Failed', message: 'Invalid product ID' });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ status: 'Failed', message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);

    res.json({ status: 'Success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res
      .status(500)
      .json({ status: 'Failed', message: 'Internal Server Error' });
  }
};


export const filterProducts = async (req, res) => {
  const { categoryIds } = req.body;

  try {
    const products = await Product.find({ category: { $in: categoryIds } });

    res.json({
      products: products,
      message: "Products filtered successfully"
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ message: error.message });
  }
};