import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Plus, Minus, LogIn, QrCode, X } from 'lucide-react';
import { generateWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '917619496646';
// Updated to match the screenshot provided
const STORE_UPI_ID = '7619496646@axl'; 
const STORE_NAME = 'Kraftera';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground font-body mb-8">Discover our handcrafted jewelry collection.</p>
        <Link to="/products" className="inline-block bg-foreground text-background px-8 py-3 text-sm font-body tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
          Shop Now
        </Link>
      </main>
    );
  }

  const whatsappMsg = generateWhatsAppMessage(
    items,
    total,
    user ? {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    } : undefined
  );
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_NUMBER, whatsappMsg);

  // Generate the UPI intent link for the QR Code
  const upiLink = `upi://pay?pa=${STORE_UPI_ID}&pn=${encodeURIComponent(STORE_NAME)}&am=${total.toFixed(2)}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}&color=0f172a`;

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl md:text-4xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 p-4 border border-border rounded">
              <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                <img src={item.product.images[0]?.url || '/placeholder.svg'} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="font-display text-sm font-medium hover:text-accent transition-colors">
                  {item.product.name}
                </Link>
                <p className="text-muted-foreground text-sm font-body">₹{item.product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                  <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-sm font-body font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.product.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="border border-border rounded p-6">
            <h2 className="font-display text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 text-sm font-body">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-muted-foreground">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-body font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Login prompt */}
            {showLoginPrompt && (
              <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded text-sm font-body text-center">
                <p className="text-slate-700 mb-2">Please sign in to place your order</p>
                <button
                  onClick={() => navigate('/auth')}
                  className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded text-xs font-body tracking-wide uppercase hover:bg-pink-500 transition-colors"
                >
                  <LogIn size={13} /> Sign In / Sign Up
                </button>
              </div>
            )}

            {user ? (
              user.role === 'admin' ? (
                <div className="mt-6 p-4 bg-accent/10 border border-border rounded text-sm font-body text-center text-muted-foreground">
                  View your products and categories in the <Link to="/admin" className="underline text-foreground">Admin Panel</Link>.<br />
                  *Admin accounts do not place customer orders.*
                </div>
              ) : (
                <button
                  onClick={() => setShowQRModal(true)}
                  className="mt-6 w-full bg-slate-900 text-white py-3.5 text-sm font-body tracking-wider uppercase hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 rounded shadow-sm"
                >
                  <QrCode size={18} /> Proceed to Checkout
                </button>
              )
            ) : (
              <button
                onClick={() => setShowLoginPrompt(true)}
                className="mt-6 w-full bg-[#25D366] text-white py-3.5 text-sm font-body tracking-wider uppercase hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 rounded"
              >
                <LogIn size={15} /> Sign in to Order
              </button>
            )}

            <button
              onClick={clearCart}
              className="mt-3 w-full border border-border py-2.5 text-sm font-body text-muted-foreground hover:text-foreground hover:border-foreground transition-colors rounded"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      {/* UPI QR Payment Modal */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md border border-border rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
                <h3 className="font-display text-lg font-bold">Secure Checkout</h3>
                <button onClick={() => setShowQRModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex flex-col items-center">
                <p className="text-sm font-body text-muted-foreground text-center mb-6">
                  Scan this QR code using Google Pay, PhonePe, Paytm, or any UPI app to pay <strong className="text-foreground border-b border-slate-300">₹{total.toFixed(2)}</strong>.
                </p>

                <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-200 mb-6 flex justify-center w-fit mx-auto relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <img src={qrCodeUrl} alt="UPI Payment QR Code" className="w-52 h-52 object-contain" />
                </div>

                <div className="w-full bg-blue-50 text-blue-800 text-xs font-body p-3 rounded-lg text-center mb-6 border border-blue-100">
                  Total Amount to Pay: <strong>₹{total.toFixed(2)}</strong>
                </div>

                <p className="text-xs font-body text-slate-500 mb-2">Once you have successfully paid, click below to confirm your order.</p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowQRModal(false)}
                  className="w-full bg-[#25D366] text-white py-3.5 text-sm font-body tracking-wider uppercase hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 rounded shadow-md font-semibold"
                >
                  Confirm Payment via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Cart;
