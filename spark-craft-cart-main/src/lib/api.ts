import { Product, Category, Order } from './types';
import { mockCategories, mockOrders } from './mock-data';

// Dynamic configuration for API base URL
export const API_BASE = (import.meta as any).env?.VITE_API_URL || 'https://kraftera.onrender.com/api';
console.log(`🌐 Frontend API_BASE initialized as: ${API_BASE}`);

let ordersDb: Order[] = [...mockOrders]; // Keeping orders mock for now
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export const api = {
  // Products
  async getProducts(filters?: { category_id?: string; min_price?: number; max_price?: number; search?: string }): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error('Fetch failed');
      let products: Product[] = await res.json();

      products = products.filter(p => p.is_visible !== false);
      if (filters?.category_id) products = products.filter(p => p.category_id === filters.category_id);
      if (filters?.min_price != null) products = products.filter(p => p.price >= filters.min_price!);
      if (filters?.max_price != null) products = products.filter(p => p.price <= filters.max_price!);
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      return products;
    } catch (e) {
      console.error(e);
      return []; // Fallback empty if backend offline
    }
  },

  async getProduct(slug: string): Promise<Product | undefined> {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (!res.ok) return undefined;
      return await res.json();
    } catch { return undefined; }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (e) {
      console.error('❌ getCategories Error:', e);
      return mockCategories; // Fallback to mock if API fails
    }
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(errorMsg || 'Failed to create category');
    }
    return await res.json();
  },

  // Admin
  async getAllProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return [];
    }
  },

  async createProduct(data: Partial<Product>, imageFile?: File): Promise<Product> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const errorText = await res.text();
      let msg = res.statusText;
      try {
        const parsed = JSON.parse(errorText);
        msg = parsed.error || parsed.message || errorText;
      } catch { msg = errorText || res.statusText || 'Unknown Server Error'; }
      
      console.error('❌ API createProduct failed:', errorText);
      throw new Error(`Failed to create product: ${msg}`);
    }
    return await res.json();
  },

  async updateProduct(id: string, data: Partial<Product>, imageFile?: File): Promise<Product> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to update');
    return await res.json();
  },

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    await delay(300);
    return [...ordersDb];
  },

  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    await delay(300);
    const newOrder: Order = {
      ...order,
      id: `ORD-${String(Date.now()).slice(-6)}`,
      created_at: new Date().toISOString(),
    };
    ordersDb.push(newOrder);
    return newOrder;
  },
};
