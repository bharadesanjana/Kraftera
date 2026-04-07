import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import krafteraLogo from '@/assets/657832268_17873575911568844_1673573843978172173_n.jpg';
import {
  Eye, EyeOff, Lock, ShieldCheck, LogOut,
  Plus, Pencil, Trash2, ShoppingCart, LayoutGrid,
  FolderPlus, Package, ListOrdered, ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import { Product, Category, Order } from '@/lib/types';
import { toast } from 'sonner';

/* ─── helpers ─── */
const inputCls = 'w-full border border-border bg-background px-4 py-2.5 text-sm font-body focus:outline-none focus:border-slate-400 transition-colors rounded';
const btnPrimary = 'flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 text-sm font-body tracking-wide uppercase hover:bg-pink-500 transition-colors rounded';
const btnOutline = 'flex items-center gap-2 border border-border text-muted-foreground px-5 py-2.5 text-sm font-body hover:text-foreground hover:border-foreground transition-colors rounded';

/* ══════════════════════════════════════════
   ADMIN LOGIN
══════════════════════════════════════════ */
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) { onLogin(); }
    else { setError('Invalid admin credentials. Please try again.'); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={krafteraLogo} alt="Kraftera" className="w-16 h-16 rounded-full object-cover ring-4 ring-border mb-3" />
          <h1 className="font-display text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-xs text-muted-foreground font-body mt-1 flex items-center gap-1"><ShieldCheck size={12} /> Restricted access — admins only</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-1.5">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@kraftera.com" required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" required className={inputCls + ' pr-10'} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <motion.p className="text-red-500 text-sm font-body bg-red-50 border border-red-200 rounded px-3 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 text-sm font-body tracking-wider uppercase hover:bg-pink-500 transition-colors duration-300 rounded disabled:opacity-60">
              <Lock size={14} />{loading ? 'Signing in…' : 'Sign In as Admin'}
            </button>
          </form>
          <p className="text-center text-xs text-muted-foreground font-body mt-6">Not an admin? <a href="/" className="underline hover:text-foreground transition-colors">Return to store</a></p>
        </div>
        <p className="text-center text-xs text-muted-foreground font-body mt-4 opacity-60">© {new Date().getFullYear()} Kraftera · Admin Portal</p>
      </motion.div>
    </main>
  );
};

/* ══════════════════════════════════════════
   PRODUCT FORM — matches screenshot layout
══════════════════════════════════════════ */
const SHIPPING_OPTIONS = ['Standard (3-5 days)', 'Express (1-2 days)', 'Pan India Flat Rate', 'Free Shipping'];

const ProductForm = ({
  initial, categories, onSave, onCancel
}: {
  initial: Partial<Product>;
  categories: Category[];
  onSave: (data: Partial<Product>, file: File | null) => Promise<void>;
  onCancel: () => void;
}) => {
  const [data, setData] = useState<Partial<Product>>(initial);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [shipping, setShipping] = useState('');
  const [saving, setSaving] = useState(false);
  const set = (patch: Partial<Product>) => setData(d => ({ ...d, ...patch }));

  const handleSave = async () => {
    setSaving(true);
    await onSave({ ...data, description: data.description ? `${data.description}${shipping ? ` | Shipping: ${shipping}` : ''}` : data.description }, imageFile);
    setSaving(false);
  };

  const labelCls = 'block text-sm font-body text-slate-700 mb-1 font-medium';
  const fieldCls = 'w-full border border-slate-300 bg-white px-3 py-2 text-sm font-body focus:outline-none focus:border-blue-400 transition-colors rounded';

  return (
    <div className="space-y-5">

      {/* Post Photo */}
      <div>
        <label className={labelCls}>Post Photo</label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <span className="px-3 py-1.5 bg-slate-200 border border-slate-400 text-sm font-body text-slate-700 rounded hover:bg-slate-300 transition-colors">
              Choose File
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files && setImageFile(e.target.files[0])} />
          </label>
          <span className="text-sm font-body text-slate-500">{imageFile ? imageFile.name : 'No file chosen'}</span>
        </div>
        {data.images?.[0]?.url && (
          <p className="text-xs text-muted-foreground mt-1">Current: {data.images[0].url}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className={labelCls}>Name</label>
        <input
          value={data.name || ''}
          onChange={e => set({ name: e.target.value })}
          className={fieldCls}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>Description</label>
        <textarea
          value={data.description || ''}
          onChange={e => set({ description: e.target.value })}
          rows={4}
          className={fieldCls + ' resize-none'}
        />
      </div>

      {/* Price */}
      <div>
        <label className={labelCls}>Price</label>
        <input
          type="number"
          value={data.price || ''}
          onChange={e => set({ price: Number(e.target.value) })}
          className={fieldCls}
        />
      </div>

      {/* Category dropdown */}
      <div>
        <label className={labelCls}>Category</label>
        <select
          value={data.category_id || ''}
          onChange={e => set({ category_id: e.target.value })}
          className={fieldCls}
        >
          <option value="">Please select</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Shipping dropdown */}
      <div>
        <label className={labelCls}>Shipping</label>
        <select
          value={shipping}
          onChange={e => setShipping(e.target.value)}
          className={fieldCls}
        >
          <option value="">Please select</option>
          {SHIPPING_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Quantity / Stock */}
      <div>
        <label className={labelCls}>Quantity</label>
        <input
          type="number"
          value={data.stock || ''}
          onChange={e => set({ stock: Number(e.target.value) })}
          className={fieldCls}
        />
      </div>

      {/* Visible toggle */}
      <label className="flex items-center gap-2 text-sm font-body cursor-pointer text-slate-700">
        <input type="checkbox" checked={data.is_visible ?? true} onChange={e => set({ is_visible: e.target.checked })} />
        Visible on storefront
      </label>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 border border-blue-400 text-blue-600 text-sm font-body rounded hover:bg-blue-50 transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : (data.id ? 'Update Product' : 'Create Product')}
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 border border-slate-300 text-slate-500 text-sm font-body rounded hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════ */
type Screen = 'home' | 'create-category' | 'create-product' | 'manage-products' | 'view-orders';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);

  // Category form
  const [newCat, setNewCat] = useState({ name: '', description: '', slug: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [p, c, o] = await Promise.all([api.getAllProducts(), api.getCategories(), api.getOrders()]);
    setProducts(p); setCategories(c); setOrders(o);
    setLoading(false);
  };

  const handleSaveProduct = async (data: Partial<Product>, file: File | null) => {
    try {
      if (data.id) {
        await api.updateProduct(data.id, data, file || undefined);
        toast.success('Product updated ✅');
      } else {
        await api.createProduct(data, file || undefined);
        toast.success('Product created ✅');
      }
      setEditingProduct(null);
      setScreen('manage-products');
      loadData();
    } catch (e: any) {
      console.error('❌ Save Product Error:', e);
      toast.error(`Failed to save product: ${e.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await api.deleteProduct(id);
    toast.success('Deleted');
    loadData();
  };

  const handleToggleVisibility = async (product: Product) => {
    await api.updateProduct(product.id, { is_visible: !product.is_visible });
    loadData();
  };

  const handleCreateCategory = async () => {
    try {
      if (!newCat.name) return toast.error('Category name is required');
      await api.createCategory(newCat);
      toast.success(`Category "${newCat.name}" created successfully ✅`);
      setNewCat({ name: '', description: '', slug: '' });
      loadData();
      setScreen('home');
    } catch (e: any) {
      console.error('❌ Create Category Error:', e);
      toast.error(`Failed to create category: ${e.message}`);
    }
  };

  const sidebarItems = [
    { id: 'create-category' as Screen, icon: <FolderPlus size={16} />, label: 'Create Category' },
    { id: 'create-product'  as Screen, icon: <Plus size={16} />,        label: 'Create Product' },
    { id: 'view-orders'     as Screen, icon: <ListOrdered size={16} />, label: 'View Orders' },
    { id: 'manage-products' as Screen, icon: <LayoutGrid size={16} />,  label: 'Manage Products' },
  ];

  /* ── Products grouped by category ── */
  const grouped = categories.map(cat => ({
    cat,
    items: products.filter(p => p.category_id === cat.id),
  }));
  const uncategorized = products.filter(p => !categories.find(c => c.id === p.category_id));

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center text-muted-foreground font-body">Loading…</main>
  );

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      {/* Top bar */}
      <div className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={krafteraLogo} alt="Kraftera" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display text-base font-bold">KRAFTERA</span>
            <span className="text-xs font-body text-muted-foreground uppercase tracking-widest hidden sm:inline">Admin</span>
          </div>
          <button onClick={() => { sessionStorage.removeItem('kraftera_admin_authed'); logout(); navigate('/'); }} className="flex items-center gap-1.5 text-sm text-muted-foreground font-body hover:text-foreground transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
        {/* ── Sidebar ── */}
        <aside className="w-52 flex-shrink-0 hidden md:block">
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-border">
              <p className="font-display text-sm font-bold text-slate-900">Admin Links</p>
            </div>
            <nav className="divide-y divide-border">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setScreen(item.id); setEditingProduct(null); }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-body transition-colors text-left ${screen === item.id ? 'text-pink-500 bg-pink-50' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
                >
                  <span className="flex items-center gap-2">{item.icon}{item.label}</span>
                  <ChevronRight size={13} className="opacity-40" />
                </button>
              ))}
            </nav>
          </div>

          {/* Category quick-add per category */}
          <div className="mt-4 bg-background border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-border">
              <p className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">Add by Category</p>
            </div>
            <nav className="divide-y divide-border">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setEditingProduct({ is_visible: true, stock: 0, price: 0, images: [], category_id: cat.id }); setScreen('create-product'); }}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-left"
                >
                  <span className="flex items-center gap-2"><Package size={13} />{cat.name}</span>
                  <Plus size={12} className="opacity-40" />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">

          {/* HOME */}
          {screen === 'home' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className="flex items-center gap-4 bg-background border border-border rounded-xl p-5 hover:border-pink-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-500 group-hover:bg-pink-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-display text-sm font-semibold text-slate-800">{item.label}</span>
                  <ChevronRight size={16} className="ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          )}

          {/* CREATE CATEGORY */}
          {screen === 'create-category' && (
            <div className="bg-background border border-border rounded-xl p-6 max-w-md shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FolderPlus size={18} /> Create Category</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-1.5">Category Name *</label>
                  <input value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. Earrings" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-1.5">Slug (auto-filled)</label>
                  <input value={newCat.slug} onChange={e => setNewCat({ ...newCat, slug: e.target.value })} placeholder="e.g. earrings" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-1.5">Description</label>
                  <textarea value={newCat.description} onChange={e => setNewCat({ ...newCat, description: e.target.value })} rows={3} placeholder="Short description…" className={inputCls + ' resize-none'} />
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded px-3 py-2 text-xs text-amber-700 font-body">
                  💡 After clicking Save, add this category to <code>src/lib/mock-data.ts</code> to make it permanent, or connect a backend <code>/api/categories</code> endpoint.
                </div>
                <div className="flex gap-3">
                  <button onClick={handleCreateCategory} className={btnPrimary}>Save Category</button>
                  <button onClick={() => setScreen('home')} className={btnOutline}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* CREATE / EDIT PRODUCT */}
          {screen === 'create-product' && (
            <div className="bg-background border border-border rounded-xl p-6 max-w-xl shadow-sm">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus size={18} /> {editingProduct?.id ? 'Edit Product' : 'Create Product'}
              </h2>
              <ProductForm
                initial={editingProduct || { is_visible: true, stock: 0, price: 0, images: [] }}
                categories={categories}
                onSave={handleSaveProduct}
                onCancel={() => { setScreen('manage-products'); setEditingProduct(null); }}
              />
            </div>
          )}

          {/* MANAGE PRODUCTS — grouped by category */}
          {screen === 'manage-products' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2"><LayoutGrid size={18} /> Manage Products</h2>
                <button onClick={() => { setEditingProduct({ is_visible: true, stock: 0, price: 0, images: [] }); setScreen('create-product'); }} className={btnPrimary}>
                  <Plus size={15} /> Add Product
                </button>
              </div>

              {grouped.map(({ cat, items }) => (
                <div key={cat.id} className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
                    <h3 className="font-display text-sm font-bold text-slate-800">{cat.name}</h3>
                    <button
                      onClick={() => { setEditingProduct({ is_visible: true, stock: 0, price: 0, images: [], category_id: cat.id }); setScreen('create-product'); }}
                      className="flex items-center gap-1 text-xs font-body text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      <Plus size={12} /> Add to {cat.name}
                    </button>
                  </div>
                  {items.length === 0 ? (
                    <p className="text-center text-muted-foreground font-body text-sm py-6">No products yet.</p>
                  ) : (
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground text-xs uppercase tracking-wider">
                          <th className="py-2 px-4">Product</th>
                          <th className="py-2 px-4">Price</th>
                          <th className="py-2 px-4">Stock</th>
                          <th className="py-2 px-4">Visible</th>
                          <th className="py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(p => (
                          <tr key={p.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-secondary rounded overflow-hidden flex-shrink-0">
                                  <img src={p.images[0]?.url || '/placeholder.svg'} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium text-slate-800">{p.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-600">₹{p.price.toFixed(2)}</td>
                            <td className="py-3 px-4 text-slate-600">{p.stock}</td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleToggleVisibility(p)} className="text-muted-foreground hover:text-foreground transition-colors">
                                {p.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-3">
                                <button onClick={() => { setEditingProduct(p); setScreen('create-product'); }} className="text-muted-foreground hover:text-pink-500 transition-colors"><Pencil size={14} /></button>
                                <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}

              {uncategorized.length > 0 && (
                <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="px-5 py-3 border-b border-border bg-amber-50">
                    <h3 className="font-display text-sm font-bold text-amber-700">Uncategorized</h3>
                  </div>
                  <table className="w-full text-sm font-body">
                    <tbody>
                      {uncategorized.map(p => (
                        <tr key={p.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-4 font-medium">{p.name}</td>
                          <td className="py-3 px-4">₹{p.price.toFixed(2)}</td>
                          <td className="py-3 px-4">{p.stock}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-3">
                              <button onClick={() => { setEditingProduct(p); setScreen('create-product'); }} className="text-muted-foreground hover:text-pink-500 transition-colors"><Pencil size={14} /></button>
                              <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* VIEW ORDERS */}
          {screen === 'view-orders' && (
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><ListOrdered size={18} /> Orders</h2>
              <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-800">{o.id}</td>
                        <td className="py-3 px-4">{o.customer_name}</td>
                        <td className="py-3 px-4">{o.items.length} item(s)</td>
                        <td className="py-3 px-4 font-medium">₹{o.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs bg-secondary rounded-full capitalize font-body">{o.status}</span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{o.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <p className="text-center text-muted-foreground py-12">No orders yet.</p>}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   ROOT: Login gate → Dashboard
══════════════════════════════════════════ */
const Admin = () => {
  // Use sessionStorage so login is always required on a fresh tab/visit
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem('kraftera_admin_authed') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('kraftera_admin_authed', 'true');
    setAuthed(true);
  };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard />;
};

export default Admin;
