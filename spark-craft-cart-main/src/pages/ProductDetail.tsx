import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (slug) api.getProduct(slug).then(p => setProduct(p || null));
  }, [slug]);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4" />
          <div className="h-4 bg-secondary rounded w-1/4 mx-auto" />
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <Link to="/products" className="inline-flex items-center gap-1 text-muted-foreground text-sm font-body mb-8 hover:text-foreground transition-colors">
        <ChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Images */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="aspect-square bg-secondary rounded overflow-hidden mb-3">
            <img
              src={product.images[selectedImage]?.url || '/placeholder.svg'}
              alt={product.images[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-transparent'}`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="text-accent text-xs font-body tracking-[0.2em] uppercase mb-2">
            {product.category?.name || 'Jewelry'}
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-2xl font-body font-light mb-2">₹{product.price.toFixed(2)}</p>
          {product.price_range_min != null && product.price_range_max != null && (
            <p className="text-muted-foreground text-sm font-body mb-6">
              Price range: ₹{product.price_range_min} — ₹{product.price_range_max}
            </p>
          )}
          <p className="text-muted-foreground font-body leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-body text-muted-foreground">Qty:</span>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm font-body hover:bg-secondary transition-colors">−</button>
              <span className="px-4 py-2 text-sm font-body border-x border-border">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 text-sm font-body hover:bg-secondary transition-colors">+</button>
            </div>
            <span className="text-xs text-muted-foreground font-body">{product.stock} in stock</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-foreground text-background py-3.5 text-sm font-body tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default ProductDetail;
