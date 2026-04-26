// Script to seed Firestore with initial data
// Run this from Firebase Console or via Node.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Add your config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample suppliers data
const suppliers = [
  {
    name: 'Surat Textile Hub',
    city: 'Surat',
    category: 'Textile',
    priceRange: '₹80-220/m',
    contact: 'textile-hub@surat.com',
    description: 'Wholesale textile materials and fabrics for all industries',
    verified: true,
    tags: ['Quality', 'Fast Delivery'],
  },
  {
    name: 'Ring Road Market',
    city: 'Surat',
    category: 'Textile',
    priceRange: '₹60-150/m',
    contact: 'ringroad@surat.com',
    description: 'Premium textile varieties at competitive prices',
    verified: true,
    tags: ['Budget Friendly', 'Bulk Orders'],
  },
  {
    name: 'Assam Tea Direct',
    city: 'Assam',
    category: 'Tea',
    priceRange: '₹180-320/kg',
    contact: 'tea-direct@assam.com',
    description: 'Direct from Assam tea gardens, premium quality leaf tea',
    verified: true,
    tags: ['Organic', 'Direct Source'],
  },
  {
    name: 'Darjeeling Gardens Coop',
    city: 'Darjeeling',
    category: 'Tea',
    priceRange: '₹350-600/kg',
    contact: 'gardens@darjeeling.com',
    description: 'First-flush and premium Darjeeling tea directly',
    verified: true,
    tags: ['Premium', 'Cooperative'],
  },
  {
    name: 'APMC Vashi',
    city: 'Mumbai',
    category: 'Grocery',
    priceRange: 'Market Rate',
    contact: 'apmc-vashi@mumbai.com',
    description: 'Agricultural Produce Market Committee - wholesale vegetables, fruits',
    verified: true,
    tags: ['Fresh Produce', 'Market Price'],
  },
  {
    name: 'Crawford Market',
    city: 'Mumbai',
    category: 'Grocery',
    priceRange: 'Market Rate',
    contact: 'crawford@mumbai.com',
    description: 'Historic spice market with premium quality spices and dry goods',
    verified: true,
    tags: ['Spices', 'Heritage'],
  },
  {
    name: 'Gaffar Market',
    city: 'Delhi',
    category: 'Mobile',
    priceRange: 'Wholesale',
    contact: 'gaffar@delhi.com',
    description: 'Mobile phone accessories and electronics wholesale hub',
    verified: false,
    tags: ['Accessories', 'Bulk Orders'],
  },
  {
    name: 'Nehru Place',
    city: 'Delhi',
    category: 'Electronics',
    priceRange: 'Competitive',
    contact: 'nehru-place@delhi.com',
    description: 'Electronics wholesale market for IT and consumer electronics',
    verified: true,
    tags: ['Tech', 'Warranty'],
  },
  {
    name: 'Pune Hardware Bazaar',
    city: 'Pune',
    category: 'Hardware',
    priceRange: '₹5-500',
    contact: 'hardware@pune.com',
    description: 'Complete hardware supplies for construction and industrial use',
    verified: true,
    tags: ['Quality', 'Installation Support'],
  },
  {
    name: 'Bhiwandi Textile Zone',
    city: 'Mumbai',
    category: 'Textile',
    priceRange: '₹55-180/m',
    contact: 'bhiwandi@mumbai.com',
    description: 'Largest textile hub in Asia, loom fabrics and materials',
    verified: true,
    tags: ['Bulk Orders', 'Custom Fabrics'],
  },
];

// Seed suppliers
async function seedSuppliers() {
  const suppliersRef = collection(db, 'suppliers');
  
  for (const supplier of suppliers) {
    try {
      const docRef = await addDoc(suppliersRef, supplier);
      console.log('Supplier added:', docRef.id, supplier.name);
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  }
}

// Market data samples
const marketData = [
  {
    id: 'mumbai_textile',
    city: 'Mumbai',
    businessType: 'Textile',
    avgRent: 15000,
    avgLabour: 20000,
    avgMaterial: 50000,
    demandLevel: 'High',
    competition: 'High',
  },
  {
    id: 'delhi_electronics',
    city: 'Delhi',
    businessType: 'Electronics',
    avgRent: 20000,
    avgLabour: 25000,
    avgMaterial: 70000,
    demandLevel: 'High',
    competition: 'Very High',
  },
  {
    id: 'bangalore_services',
    city: 'Bangalore',
    businessType: 'Services',
    avgRent: 12000,
    avgLabour: 18000,
    avgMaterial: 5000,
    demandLevel: 'High',
    competition: 'Medium',
  },
];

// Seed market data
async function seedMarketData() {
  const marketDataRef = collection(db, 'marketData');
  
  for (const data of marketData) {
    try {
      const docRef = await addDoc(marketDataRef, data);
      console.log('Market data added:', docRef.id);
    } catch (error) {
      console.error('Error adding market data:', error);
    }
  }
}

// Run seeding
console.log('Starting Firestore seeding...');
await seedSuppliers();
await seedMarketData();
console.log('Seeding complete!');
