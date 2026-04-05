import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  price_range_min: { type: Number },
  price_range_max: { type: Number },
  category_id: { type: String, default: '1' },
  images: [{
    id: String,
    url: String,
    alt: String,
    sort_order: Number
  }],
  stock: { type: Number, default: 0 },
  is_visible: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Product = mongoose.model('Product', productSchema);
