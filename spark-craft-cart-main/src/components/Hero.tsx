import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '@/assets/background.png';

const Hero = () => (
  <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-white overflow-hidden">
    <img
      src={bgImage}
      alt="Kraftera background"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'blur(1px)', opacity: 1 }}
      width={1920}
      height={1080}
    />
    {/* Light gradient only behind text for readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/40 to-transparent" />
    <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl"
      >
        <motion.p
          className="text-pink-500 text-xs font-body tracking-[0.3em] uppercase mb-5 font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ✨ 100% Handmade With Love
        </motion.p>

        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Handmade, Just Like<br />Your Story.
        </motion.h1>

        <motion.p
          className="text-slate-600 font-body text-base md:text-lg mb-5 leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Unique resin art &amp; jewellery crafted with love — customized just for you.
        </motion.p>

        <motion.p
          className="text-slate-500 font-body text-sm mb-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          🎁 Perfect for gifts &nbsp;•&nbsp; 🚚 Pan India shipping &nbsp;•&nbsp; ✨ Made on order
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Link
            to="/products"
            className="inline-block bg-slate-900 text-white px-8 py-3.5 text-sm font-body tracking-wider uppercase hover:bg-pink-500 transition-colors duration-300 shadow-md"
          >
            Shop Collection
          </Link>
          <a
            href="https://wa.me/917619496646?text=Hi%20Kraftera!%20I%20would%20like%20to%20customize%20a%20piece%20%F0%9F%8E%80%20Please%20help%20me%20with%20the%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-slate-900 text-slate-900 px-7 py-3.5 text-sm font-body tracking-wider uppercase hover:bg-slate-900 hover:text-white transition-colors duration-300"
          >
            ✦ Customize Your Piece
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
