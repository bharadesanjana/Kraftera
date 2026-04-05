import { Link, useNavigate, useLocation } from 'react-router-dom';
import krafteraLogo from '@/assets/657832268_17873575911568844_1673573843978172173_n.jpg';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const { itemCount } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToAbout = () => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 400);
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={krafteraLogo}
            alt="Kraftera logo"
            className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors"
          />
          <span className="font-display text-xl md:text-2xl font-semibold tracking-wide group-hover:text-accent transition-colors">
            KRAFTERA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-body tracking-wider uppercase">
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/products?category=bangles" className="text-muted-foreground hover:text-foreground transition-colors">Bangles</Link>
          <Link to="/products?category=necklaces" className="text-muted-foreground hover:text-foreground transition-colors">Necklaces</Link>
          <Link to="/products?category=chains" className="text-muted-foreground hover:text-foreground transition-colors">Chains</Link>
          <button onClick={scrollToAbout} className="text-muted-foreground hover:text-foreground transition-colors">ABOUT</button>
        </nav>

        <div className="flex items-center gap-4">
          <Link to={user ? '/account' : '/auth'} className="text-foreground hover:text-accent transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="relative text-foreground hover:text-accent transition-colors">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-semibold">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3 text-sm font-body tracking-wider uppercase">
          <Link to="/products" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Shop All</Link>
          <Link to="/products?category=bangles" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Bangles</Link>
          <Link to="/products?category=necklaces" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Necklaces</Link>
          <Link to="/products?category=chains" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Chains</Link>
          <Link to="/products?category=keychains" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Keychains</Link>
          <button onClick={scrollToAbout} className="text-left text-muted-foreground hover:text-foreground">About</button>
        </nav>
      )}
    </motion.header>
  );
};

export default Header;
