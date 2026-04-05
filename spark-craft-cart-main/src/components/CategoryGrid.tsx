import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/lib/types';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const CategoryGrid = ({ categories }: { categories: Category[] }) => (
  <section className="container mx-auto px-4 py-16 md:py-24">
    <motion.h2
      className="font-display text-2xl md:text-3xl text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Shop by Category
    </motion.h2>
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {categories.map((cat) => (
        <motion.div key={cat.id} variants={item} whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }}>
          <Link
            to={`/products?category=${cat.slug}`}
            className="block aspect-square bg-secondary rounded overflow-hidden relative group shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
              <h3 className="font-display text-xl font-medium text-white">{cat.name}</h3>
              <p className="text-white/80 text-sm font-body mt-1">{cat.description}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default CategoryGrid;

