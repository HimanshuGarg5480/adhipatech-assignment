import mongoose from "mongoose";


// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Vegetable', 'Fruit']
  },
  season: {
    type: String,
    trim: true,
    enum: ['Spring', 'Summer', 'Autumn', 'Winter', 'All Year']
  },
  organic: {
    type: Boolean,
    default: false
  },
  origin: {
    type: String,
    trim: true
  }
});
export const Product = mongoose.model('Product', productSchema);

