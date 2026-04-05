import { Link } from 'react-router-dom';
import krafteraLogo from '@/assets/657832268_17873575911568844_1673573843978172173_n.jpg';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 mt-20">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ── Brand ── */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <img
              src={krafteraLogo}
              alt="Kraftera logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-border group-hover:ring-pink-300 transition-all"
            />
            <span className="font-display text-lg font-bold tracking-wide text-foreground group-hover:text-pink-500 transition-colors">
              KRAFTERA
            </span>
          </Link>
          <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-[220px]">
            Handmade with love ✨ — resin art, terracotta, bracelets &amp; keychains, crafted just for you.
          </p>
          <div className="flex gap-2 mt-1">
            <a
              href="https://www.instagram.com/kraftera_11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-body text-muted-foreground hover:border-pink-400 hover:text-pink-500 transition-colors bg-background"
            >
              <InstagramIcon /> @kraftera_11
            </a>
            <a
              href="https://wa.me/917619496646?text=Hi%20Kraftera!%20I%20would%20like%20to%20place%20an%20order%20%F0%9F%8E%80"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-body text-muted-foreground hover:border-green-400 hover:text-green-600 transition-colors bg-background"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>

        {/* ── Shop ── */}
        <div>
          <h4 className="font-display text-xs font-bold mb-4 uppercase tracking-widest text-foreground">Shop</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground font-body">
            <Link to="/products" className="hover:text-foreground transition-colors">All Products</Link>
            <Link to="/products?category=resin" className="hover:text-foreground transition-colors">Resin Art</Link>
            <Link to="/products?category=terracotta" className="hover:text-foreground transition-colors">Terracotta</Link>
            <Link to="/products?category=bracelets" className="hover:text-foreground transition-colors">Bracelets</Link>
            <Link to="/products?category=keychains" className="hover:text-foreground transition-colors">Keychains</Link>
          </div>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 className="font-display text-xs font-bold mb-4 uppercase tracking-widest text-foreground">Get in Touch</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground font-body">
            <a href="https://www.instagram.com/kraftera_11" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-pink-500 transition-colors">
              <InstagramIcon /> Instagram DM
            </a>
            <a href="https://wa.me/917619496646?text=Hi%20Kraftera!%20I%20would%20like%20to%20place%20an%20order%20%F0%9F%8E%80"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-green-600 transition-colors">
              <WhatsAppIcon /> WhatsApp
            </a>
            <p className="text-xs text-muted-foreground/60 mt-1">For orders, customization &amp; enquiries</p>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-body">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span>© {new Date().getFullYear()} Kraftera. All rights reserved.</span>
          <Link to="/admin" className="hover:text-foreground transition-colors border-b border-transparent hover:border-muted-foreground/30 pb-0.5">Admin Portal</Link>
        </div>
        <span className="tracking-wide">Handcrafted with ❤️ in India</span>
      </div>
    </div>
  </footer>
);

export default Footer;
