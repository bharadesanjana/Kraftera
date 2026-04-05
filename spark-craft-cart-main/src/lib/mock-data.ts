import { Category, Product, Order } from './types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Bangles', slug: 'bangles', description: 'Handcrafted bangles with intricate designs', image: '/assets/images/blackbangles.jpeg' },
  { id: '2', name: 'Necklaces', slug: 'necklaces', description: 'Elegant necklaces for every occasion', image: '/assets/images/necklace.jpeg' },
  { id: '3', name: 'Chains', slug: 'chains', description: 'Delicate chains crafted with precision', image: '/assets/images/smallpadent neacklace.jpeg' },
  { id: '4', name: 'Keychains', slug: 'keychains', description: 'Unique artisan keychains', image: '/assets/images/keychain.jpeg' },
];

const placeholder = '/placeholder.svg';

export const mockProducts: Product[] = [
  {
    id: '1', name: 'Golden Twist Bangle', slug: 'golden-twist-bangle',
    description: 'A stunning handcrafted bangle featuring an elegant twisted design. Each piece is individually made, ensuring uniqueness.',
    price: 89.99, price_range_min: 79, price_range_max: 99,
    category_id: '1', category: mockCategories[0],
    images: [{ id: '1', url: placeholder, alt: 'Golden Twist Bangle', sort_order: 0 }],
    stock: 15, is_visible: true, created_at: '2024-01-01', updated_at: '2024-01-01',
  },
  {
    id: '2', name: 'Pearl Drop Necklace', slug: 'pearl-drop-necklace',
    description: 'An exquisite pearl drop necklace handcrafted with freshwater pearls and delicate chain work.',
    price: 129.99, price_range_min: 119, price_range_max: 149,
    category_id: '2', category: mockCategories[1],
    images: [{ id: '2', url: placeholder, alt: 'Pearl Drop Necklace', sort_order: 0 }],
    stock: 8, is_visible: true, created_at: '2024-01-02', updated_at: '2024-01-02',
  },
  {
    id: '3', name: 'Minimalist Silver Chain', slug: 'minimalist-silver-chain',
    description: 'A beautifully simple silver chain, perfect for layering or wearing alone.',
    price: 49.99, price_range_min: 39, price_range_max: 59,
    category_id: '3', category: mockCategories[2],
    images: [{ id: '3', url: placeholder, alt: 'Minimalist Silver Chain', sort_order: 0 }],
    stock: 25, is_visible: true, created_at: '2024-01-03', updated_at: '2024-01-03',
  },
  {
    id: '4', name: 'Artisan Leaf Keychain', slug: 'artisan-leaf-keychain',
    description: 'A charming handmade keychain featuring a delicate leaf motif, crafted from brass.',
    price: 24.99, price_range_min: 19, price_range_max: 29,
    category_id: '4', category: mockCategories[3],
    images: [{ id: '4', url: placeholder, alt: 'Artisan Leaf Keychain', sort_order: 0 }],
    stock: 40, is_visible: true, created_at: '2024-01-04', updated_at: '2024-01-04',
  },
  {
    id: '5', name: 'Rose Gold Cuff Bangle', slug: 'rose-gold-cuff-bangle',
    description: 'An elegant rose gold cuff bangle with a hammered texture finish.',
    price: 109.99, category_id: '1', category: mockCategories[0],
    images: [{ id: '5', url: placeholder, alt: 'Rose Gold Cuff Bangle', sort_order: 0 }],
    stock: 12, is_visible: true, created_at: '2024-01-05', updated_at: '2024-01-05',
  },
  {
    id: '6', name: 'Layered Chain Necklace', slug: 'layered-chain-necklace',
    description: 'A sophisticated multi-layered chain necklace that adds depth to any outfit.',
    price: 79.99, category_id: '2', category: mockCategories[1],
    images: [{ id: '6', url: placeholder, alt: 'Layered Chain Necklace', sort_order: 0 }],
    stock: 18, is_visible: true, created_at: '2024-01-06', updated_at: '2024-01-06',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001', user_id: '1',
    items: [{ product_id: '1', product_name: 'Golden Twist Bangle', quantity: 1, price: 89.99 }],
    total: 89.99, status: 'pending',
    customer_name: 'Jane Doe', customer_email: 'jane@example.com',
    customer_phone: '+1234567890', shipping_address: '123 Main St, City',
    created_at: '2024-03-15',
  },
];
