import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image_url: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Category = mongoose.model('Category', categorySchema);
