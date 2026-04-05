import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import ImageMarquee from '@/components/ImageMarquee';
import { api } from '@/lib/api';
import { Product, Category } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const highlights = [
  { icon: '💌', title: 'DM for Orders',  desc: 'Reach out on Instagram or WhatsApp to place your custom order' },
  { icon: '🌎', title: 'Wide Shipping',   desc: 'We ship across India & beyond' },
  { icon: '🎀', title: 'Customization',   desc: 'Personalize any piece just for you' },
  { icon: '🎁', title: 'Return Gifts',    desc: 'Bulk orders for events & occasions' },
  { icon: '🪨', title: 'Resin Art',       desc: 'Unique resin creations in every colour' },
  { icon: '🏺', title: 'Terracotta',      desc: 'Earthy handcrafted terracotta jewellery' },
  { icon: '📿', title: 'Bracelets',       desc: 'Delicate & bold styles for every wrist' },
  { icon: '🔑', title: 'Keychains',       desc: 'Cute handmade keychains & accessories' },
];

const Index = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getProducts().then(p => setFeatured(p.slice(0, 4)));
    api.getCategories().then(setCategories);
  }, []);

  return (
    <main>

      {/* 1 ── Hero */}
      <Hero />

      {/* 2 ── Shop by Category */}
      <CategoryGrid categories={categories} />

      {/* 3 ── Featured Pieces + scrolling image strip */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-display text-2xl md:text-3xl text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Pieces
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Scrolling image strip — lives inside the Featured section */}
        <div className="mt-16">
          <motion.p
            className="text-center text-xs font-body tracking-[0.3em] uppercase text-pink-400 font-semibold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ✨ Our Creations — Crafted with Love
          </motion.p>
          <ImageMarquee />
        </div>
      </section>

      {/* 4 ── About Kraftera — one clean section */}
      <motion.section
        id="about"
        className="bg-secondary/60 border-y border-border py-16 md:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="container mx-auto px-4">
          {/* Heading */}
          <motion.p
            className="text-center text-pink-500 text-xs tracking-[0.3em] uppercase font-body font-semibold mb-3"
            variants={fadeUp}
          >
            ✨ About Kraftera
          </motion.p>
          <motion.h2
            className="font-display text-2xl md:text-3xl text-center mb-4 text-slate-900"
            variants={fadeUp}
          >
            100% Handmade Things 🌈
          </motion.h2>
          <motion.p
            className="text-center text-slate-600 font-body text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed"
            variants={fadeUp}
          >
            Every piece is crafted with love — resin art, terracotta jewellery, bracelets &amp; keychains.
            Perfect for gifting, return gifts &amp; everyday wear. Customization always available!
          </motion.p>

          {/* 8 Highlight cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            variants={stagger}
          >
            {highlights.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.22 }}
                className="bg-background border border-border rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300 cursor-default"
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  {icon}
                </motion.div>
                <h4 className="font-display text-sm font-semibold mb-1 text-slate-800">{title}</h4>
                <p className="text-slate-500 font-body text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Instagram CTA */}
          <motion.div className="flex justify-center mt-10" variants={fadeUp}>
            <a
              href="https://www.instagram.com/kraftera_11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white text-sm font-body tracking-wide hover:bg-pink-500 transition-colors duration-300 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Follow us @kraftera_11
            </a>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
};

export default Index;
