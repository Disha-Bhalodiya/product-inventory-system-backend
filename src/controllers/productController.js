import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all products with filters, search, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  // Build filter query object
  const query = {};

  // Name Search filter (case-insensitive regex match)
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }

  // Categories filter (match elements in array)
  if (req.query.categories) {
    // Check if query.categories is a string or array
    const categoriesArray = Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories];
      
    query.categories = { $in: categoriesArray };
  }

  // Run database query
  const totalResults = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalResults / limit);

  res.status(200).json({
    status: 200,
    message: 'Products retrieved successfully',
    data: {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        limit
      }
    }
  });
});

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error(`Product not found with id of ${req.params.id}`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    status: 200,
    message: 'Product retrieved successfully',
    data: product
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Public
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, quantity, categories } = req.body;

  // Manual duplicate check to throw a clean validation message
  const nameExists = await Product.findOne({ name: { $regex: `^${name.trim()}$`, $options: 'i' } });
  if (nameExists) {
    const error = new Error('Product name must be unique. Duplicate names are not allowed.');
    error.statusCode = 400;
    return next(error);
  }

  const product = await Product.create({
    name,
    description,
    quantity,
    categories
  });

  res.status(201).json({
    status: 201,
    message: 'Product created successfully',
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, description, quantity, categories } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error(`Product not found with id of ${req.params.id}`);
    error.statusCode = 404;
    return next(error);
  }

  // Name uniqueness check for different products
  if (name && name.toLowerCase() !== product.name.toLowerCase()) {
    const nameExists = await Product.findOne({ name: { $regex: `^${name.trim()}$`, $options: 'i' } });
    if (nameExists) {
      const error = new Error('Product name must be unique. Another product shares this name.');
      error.statusCode = 400;
      return next(error);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, quantity, categories },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 200,
    message: 'Product updated successfully',
    data: updatedProduct
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error(`Product not found with id of ${req.params.id}`);
    error.statusCode = 404;
    return next(error);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 200,
    message: 'Product deleted successfully',
    data: null
  });
});

// @desc    Get dashboard statistics
// @route   GET /api/products/stats
// @access  Public
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();

  // Get distinct unique categories count
  const distinctCategories = await Product.distinct('categories');
  const totalCategories = distinctCategories.length;

  // Calculate sum of all inventory item quantities using aggregate
  const quantityAgg = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalQty: { $sum: '$quantity' },
      },
    },
  ]);
  const totalQuantity = quantityAgg.length > 0 ? quantityAgg[0].totalQty : 0;

  res.status(200).json({
    status: 200,
    message: 'Dashboard stats retrieved successfully',
    data: {
      totalProducts,
      totalCategories,
      totalQuantity,
    }
  });
});
