import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import { Product, Category } from '@/lib/types';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = searchParams.get('category') || '';
  const minPrice = searchParams.get('min') ? Number(searchParams.get('min')) : undefined;
  const maxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : undefined;

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const cat = categories.find(c => c.slug === activeCategory);
    api.getProducts({
      category_id: cat?.id,
      min_price: minPrice,
      max_price: maxPrice,
    }).then(p => { setProducts(p); setLoading(false); });
  }, [activeCategory, minPrice, maxPrice, categories]);

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug) params.set('category', slug);
    else params.delete('category');
    setSearchParams(params);
  };

  const setPriceRange = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams);
    if (min != null) params.set('min', String(min)); else params.delete('min');
    if (max != null) params.set('max', String(max)); else params.delete('max');
    setSearchParams(params);
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl md:text-4xl mb-8">
        {activeCategory ? categories.find(c => c.slug === activeCategory)?.name || 'Shop' : 'All Jewelry'}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 text-xs font-body tracking-wider uppercase border transition-colors ${!activeCategory ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.slug)}
            className={`px-4 py-2 text-xs font-body tracking-wider uppercase border transition-colors ${activeCategory === cat.slug ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Price filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: 'All Prices', min: undefined, max: undefined },
          { label: 'Under ₹50', min: undefined, max: 50 },
          { label: '₹50 — ₹100', min: 50, max: 100 },
          { label: 'Over ₹100', min: 100, max: undefined },
        ].map((range, i) => {
          const isActive = minPrice === range.min && maxPrice === range.max;
          return (
            <button
              key={i}
              onClick={() => setPriceRange(range.min, range.max)}
              className={`px-3 py-1.5 text-xs font-body border transition-colors ${isActive ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-muted-foreground hover:border-accent'}`}
            >
              {range.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-secondary rounded mb-3" />
              <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-3 bg-secondary rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground font-body text-center py-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  );
};

export default Products;
