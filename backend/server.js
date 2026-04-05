import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Product } from './models/Product.js';
import { User } from './models/User.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
// Dynamically determine base URL for image serving
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// Ensure uploads dir
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

app.use(cors());
app.use(express.json());
// Serve the static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected to Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Real Registration Route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, username, password, phone, address } = req.body;
    
    // Check if user already exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ error: 'Username or email already in use' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      phone,
      address,
      role: 'customer' // Defaults to customer
    });

    await newUser.save();
    
    // Return user without password
    const userObj = newUser.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Real Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body; // In frontend, email can be used for both username/email login
    
    // Special admin check (keep existing logic if needed, but database is better)
    if (email.toLowerCase().includes('admin')) {
        const envPassword = process.env.ADMIN_PASSWORD || 'admin123';
        let isMatch = false;
        try {
          isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
        } catch (_) {}
        if (!isMatch) isMatch = (password === envPassword);

        if (isMatch) return res.json({ id: '1', name: 'Admin', email, role: 'admin' });
    }

    // Regular customers - check by email OR username
    const user = await User.findOne({ $or: [{ email }, { username: email }] });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id.toString(); // Map _id to id for frontend
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    // Re-map internal MongoDB _id to standard 'id' for the React frontend
    const mapped = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET specific product
app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json({ ...product.toObject(), id: product._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE Product (with optional image)
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    let images = data.images || [];

    // If an image was uploaded via Multer, overwrite the images array
    if (req.file) {
      images = [{
        id: '1',
        url: `${BASE_URL}/uploads/${req.file.filename}`,
        alt: data.name,
        sort_order: 0
      }];
    }

    const newProduct = new Product({
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      images
    });
    await newProduct.save();
    res.status(201).json({ ...newProduct.toObject(), id: newProduct._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    let images = data.images;

    if (req.file) {
      images = [{
        id: '1',
        url: `${BASE_URL}/uploads/${req.file.filename}`,
        alt: data.name,
        sort_order: 0
      }];
    }
    
    const updated = await Product.findByIdAndUpdate(req.params.id, { ...data, images }, { new: true });
    res.json({ ...updated.toObject(), id: updated._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Node & Express Backend running on port ${PORT}`));
