import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    // Remove the enum restriction - allow any category name
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  clientName: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    default: new Date().getFullYear().toString(),
  },
  results: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '/placeholder.jpg',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);