import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addItem } = useCart();
  const mainImage = product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-[3/4] bg-secondary rounded overflow-hidden mb-3 relative shadow-sm group-hover:shadow-md transition-shadow duration-300">
          <motion.img
            src={mainImage?.url || '/placeholder.svg'}
            alt={mainImage?.alt || product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
          {product.stock <= 3 && product.stock > 0 && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs px-2 py-1 font-body font-medium">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 left-3 bg-foreground text-background text-xs px-2 py-1 font-body font-medium">
              Sold Out
            </span>
          )}
        </div>
      </Link>
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display text-sm font-medium hover:text-accent transition-colors">{product.name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm font-body mt-0.5">₹{product.price.toFixed(2)}</p>
        </div>
        {product.stock > 0 && (
          <motion.button
            onClick={() => addItem(product)}
            className="p-2 text-muted-foreground hover:text-accent transition-colors"
            aria-label={`Add ${product.name} to cart`}
            whileTap={{ scale: 0.8, rotate: -10 }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <ShoppingBag size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

