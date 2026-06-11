import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    categories: {
      type: [String],
      required: [true, 'At least one category is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A product must belong to at least one category',
      },
    },
  },
  {
    timestamps: true, // Auto handles createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
